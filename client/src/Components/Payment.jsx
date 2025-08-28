import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { paymentService, bookingService } from "../services/api";
import { useTranslation } from "react-i18next";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { bookingId } = useParams();

  // Get current language code
  const currentLang = i18n.language || 'en';

  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object' && contentObj !== null) {
      return contentObj[currentLang] || contentObj.en || fallback;
    }
    
    return contentObj;
  };
  
  // Get booking data from location state or fetch it
  const bookingData = location.state?.bookingData;
  
  const [paymentDetails, setPaymentDetails] = useState({
    amount: bookingData?.price || 0,
    customerEmail: "",
    paymentMethod: "credit_card", // Default payment method
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [booking, setBooking] = useState(bookingData || null);
  
  // Credit card form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  
  // Mobile payment states
  const [mobileNumber, setMobileNumber] = useState("");
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  // Add mock code for demo purposes
  const [mockCode] = useState("1234");
  
  // PayPal mock states
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [paypalProcessing, setPaypalProcessing] = useState(false);

  useEffect(() => {
    // If no booking data was passed in location state, fetch it
    const fetchBookingData = async () => {
      if (!bookingData && bookingId) {
        try {
          setLoading(true);
          const userId = localStorage.getItem('userId');
          if (!userId) {
            navigate('/login', { state: { redirectTo: `/payment/${bookingId}` } });
            return;
          }
          
          const data = await bookingService.getBookingById(bookingId);
          setBooking(data);
          setPaymentDetails(prev => ({
            ...prev,
            amount: data.price || 0,
          }));
          setLoading(false);
        } catch (err) {
          setError(t("payment.errors.failedToLoadBooking"));
          setLoading(false);
        }
      }
    };

    fetchBookingData();
  }, [bookingId, bookingData, navigate, t]);

  useEffect(() => {
    // Load user email if available
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setPaymentDetails(prev => ({
        ...prev,
        customerEmail: userEmail,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  // Format card number with spaces
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    // Add spaces every 4 digits
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    
    setCardNumber(formattedValue);
  };
  
  // Format expiry date with slash
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    setCardExpiry(value);
  };
  
  // Limit CVC to 3 or 4 digits
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) return;
    setCardCvc(value);
  };

  const validateForm = () => {
    if (!paymentDetails.customerEmail) {
      setError(t("payment.errors.emailRequired"));
      return false;
    }
    
    if (!paymentDetails.paymentMethod) {
      setError(t("payment.errors.selectPaymentMethod"));
      return false;
    }
    
    if (paymentDetails.paymentMethod === "credit_card") {
      if (!cardNumber || !cardExpiry || !cardCvc) {
        setError(t("payment.errors.fillCardDetails"));
        return false;
      }
      
      // Basic format validation
      if (cardNumber.replace(/\s/g, '').length < 13) {
        setError(t("payment.errors.invalidCardNumber"));
        return false;
      }
      
      if (!cardExpiry.includes('/')) {
        setError(t("payment.errors.invalidExpiry"));
        return false;
      }
      
      if (cardCvc.length < 3) {
        setError(t("payment.errors.invalidCvc"));
        return false;
      }
    }
    
    if ((paymentDetails.paymentMethod === "easy_paisa" || paymentDetails.paymentMethod === "jazz_cash") && 
        (!mobileNumber || mobileNumber.length < 10)) {
      setError(t("payment.errors.invalidMobileNumber"));
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    // Handle mobile payment flow separately
    if (paymentDetails.paymentMethod === "easy_paisa" || paymentDetails.paymentMethod === "jazz_cash") {
      setShowConfirmationBox(true);
      return;
    }
    
    // Handle PayPal flow separately
    if (paymentDetails.paymentMethod === "paypal") {
      setShowPayPalModal(true);
      return;
    }
    
    // Process credit card payment immediately
    processPayment();
  };
  
  const handleMobileConfirmation = () => {
    if (confirmationCode.length < 4) {
      setError(t("payment.errors.invalidConfirmationCode"));
      return;
    }
    
    // Process the payment after confirmation code
    processPayment();
  };
  
  const processPayment = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      
      // Add logging to debug
      console.log(`Processing payment for booking: ${booking._id || bookingId}`);
      
      // Add bookingId to the payment data
      const paymentData = {
        ...paymentDetails,
        customerEmail: paymentDetails.customerEmail,
        bookingId: booking._id || bookingId,
        userId: userId
      };
      
      // Add payment method specific details
      if (paymentDetails.paymentMethod === "credit_card") {
        paymentData.cardDetails = {
          last4: cardNumber.replace(/\s/g, '').slice(-4)
        };
      } else if (paymentDetails.paymentMethod === "easy_paisa" || paymentDetails.paymentMethod === "jazz_cash") {
        paymentData.mobileNumber = mobileNumber;
        paymentData.confirmationCode = confirmationCode;
      }
      
      const response = await paymentService.processPayment(paymentData);
      
      if (response.success) {
        setSuccess(true);
        
        // No need to update booking status here as the payment service now handles it
        // The email notification will be triggered by the status update in bookingRoutes.js
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/my-bookings', { 
            state: { 
              paymentSuccess: true,
              transactionId: response.transactionId 
            } 
          });
        }, 2000);
      } else {
        setError(t("payment.errors.paymentFailed"));
      }
      setLoading(false);
    } catch (error) {
      setError(t("payment.errors.processingFailed"));
      setLoading(false);
    }
  };
  
  // For PayPal mock flow
  const handlePayPalContinue = () => {
    setPaypalProcessing(true);
    
    // Simulate PayPal processing delay
    setTimeout(() => {
      setShowPayPalModal(false);
      setPaypalProcessing(false);
      processPayment();
    }, 1500);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t("payment.processing")}</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="payment-success-container">
        <div className="success-icon">✓</div>
        <h2>{t("payment.success.title")}</h2>
        <p>{t("payment.success.message")}</p>
        <p>{t("payment.success.redirecting")}</p>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="error-container">
        <p>🚧 {error}</p>
        <button onClick={() => navigate('/my-bookings')}>
          {t("payment.backToBookings")}
        </button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h1>{t("payment.title")}</h1>
      
      {booking && (
        <div className="booking-summary">
          <h2>{t("payment.bookingSummary")}</h2>
          <div className="summary-details">
            <p><strong>{t("payment.destination")}:</strong> {
              typeof booking.destination === 'object' 
                ? getTranslatedContent(booking.destination.name, t("payment.selectedDestination"))
                : t("payment.selectedDestination")
            }</p>
            {booking.bookingDetails && (
              <>
                <p><strong>{t("payment.duration")}:</strong> {
                  booking.bookingDetails.duration === "3days" ? t("payment.duration3Days") : 
                  booking.bookingDetails.duration === "5days" ? t("payment.duration5Days") : t("payment.duration7Days")
                }</p>
                <p><strong>{t("payment.travelers")}:</strong> {booking.bookingDetails.travelers}</p>
                <p><strong>{t("payment.accommodation")}:</strong> {getTranslatedContent(booking.bookingDetails.accommodation, booking.bookingDetails.accommodation)}</p>
              </>
            )}
            <p className="total-amount"><strong>{t("payment.totalAmount")}:</strong> PKR {booking.price?.toLocaleString() || 0}</p>
          </div>
        </div>
      )}
      
      <div className="payment-form-container">
        <h2>{t("payment.paymentDetails")}</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="customerEmail">{t("payment.email")}</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={paymentDetails.customerEmail}
              onChange={handleInputChange}
              placeholder={t("payment.enterEmail")}
              required
            />
          </div>
          
          <div className="form-group">
            <label>{t("payment.paymentMethod")}</label>
            <div className="payment-methods">
              <div className="payment-method">
                <input
                  type="radio"
                  id="credit_card"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentDetails.paymentMethod === "credit_card"}
                  onChange={handleInputChange}
                />
                <label htmlFor="credit_card">{t("payment.methods.creditCard")}</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentDetails.paymentMethod === "paypal"}
                  onChange={handleInputChange}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="easy_paisa"
                  name="paymentMethod"
                  value="easy_paisa"
                  checked={paymentDetails.paymentMethod === "easy_paisa"}
                  onChange={handleInputChange}
                />
                <label htmlFor="easy_paisa">EasyPaisa</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="jazz_cash"
                  name="paymentMethod"
                  value="jazz_cash"
                  checked={paymentDetails.paymentMethod === "jazz_cash"}
                  onChange={handleInputChange}
                />
                <label htmlFor="jazz_cash">JazzCash</label>
              </div>
            </div>
          </div>
          
          {paymentDetails.paymentMethod === "credit_card" && (
            <div className="credit-card-fields">
              <div className="form-group">
                <label htmlFor="cardNumber">{t("payment.creditCard.cardNumber")}</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength="19"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="cardExpiry">{t("payment.creditCard.expiryDate")}</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    maxLength="5"
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="cardCvc">{t("payment.creditCard.cvc")}</label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    placeholder="123"
                    value={cardCvc}
                    onChange={handleCvcChange}
                    maxLength="4"
                  />
                </div>
              </div>
              
              <div className="card-security-info">
                <span className="security-icon">🔒</span>
                <p>{t("payment.creditCard.securityMessage")}</p>
              </div>
            </div>
          )}
          
          {(paymentDetails.paymentMethod === "easy_paisa" || paymentDetails.paymentMethod === "jazz_cash") && !showConfirmationBox && (
            <div className="mobile-payment-fields">
              <div className="form-group">
                <label htmlFor="mobileNumber">
                  {paymentDetails.paymentMethod === "easy_paisa" 
                    ? t("payment.easypaisa.mobileNumber") 
                    : t("payment.jazzcash.mobileNumber")}
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  placeholder="03XX-XXXXXXX"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                />
              </div>
              <div className="mobile-payment-info">
                <p>
                  {paymentDetails.paymentMethod === "easy_paisa" 
                    ? t("payment.easypaisa.instruction")
                    : t("payment.jazzcash.instruction")
                  }
                </p>
              </div>
            </div>
          )}
          
          {(paymentDetails.paymentMethod === "easy_paisa" || paymentDetails.paymentMethod === "jazz_cash") && showConfirmationBox && (
            <div className="confirmation-box">
              <div className="form-group">
                <label htmlFor="confirmationCode">{t("payment.confirmationCode.label")}</label>
                <input
                  type="text"
                  id="confirmationCode"
                  placeholder={t("payment.confirmationCode.placeholder")}
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                />
              </div>
              <p className="confirmation-info">
                {t("payment.confirmationCode.sent", { mobileNumber })}
                <br />
                <strong>{t("payment.confirmationCode.demo", { code: mockCode })}</strong>
              </p>
              <div className="confirmation-actions">
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => setShowConfirmationBox(false)}
                >
                  {t("payment.buttons.back")}
                </button>
                <button 
                  type="button" 
                  className="confirm-button"
                  onClick={handleMobileConfirmation}
                >
                  {t("payment.buttons.confirmPayment")}
                </button>
              </div>
            </div>
          )}
          
          {paymentDetails.paymentMethod === "paypal" && !showPayPalModal && (
            <div className="paypal-info">
              <p>{t("payment.paypal.redirectMessage")}</p>
            </div>
          )}
          
          {!showConfirmationBox && (
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate('/my-bookings')}
              >
                {t("payment.buttons.cancel")}
              </button>
              <button 
                type="submit" 
                className="pay-button"
                disabled={loading}
              >
                {loading 
                  ? t("payment.buttons.processing")
                  : paymentDetails.paymentMethod === "paypal" 
                    ? t("payment.buttons.continuePaypal")
                    : t("payment.buttons.pay", { amount: (booking?.price || 0).toLocaleString() })
                }
              </button>
            </div>
          )}
        </form>
      </div>
      
      {/* PayPal Modal */}
      {showPayPalModal && (
        <div className="paypal-modal-overlay">
          <div className="paypal-modal">
            <div className="paypal-modal-header">
              <h3>{t("payment.paypal.checkoutTitle")}</h3>
              {!paypalProcessing && (
                <button 
                  className="close-modal" 
                  onClick={() => setShowPayPalModal(false)}
                >
                  ×
                </button>
              )}
            </div>
            <div className="paypal-modal-content">
              {paypalProcessing ? (
                <div className="paypal-processing">
                  <div className="loading-spinner"></div>
                  <p>{t("payment.paypal.processing")}</p>
                </div>
              ) : (
                <>
                  <div className="paypal-logo">
                    <span className="paypal-p">P</span>
                    <span className="paypal-a">a</span>
                    <span className="paypal-y">y</span>
                    <span className="paypal-p">P</span>
                    <span className="paypal-a">a</span>
                    <span className="paypal-l">l</span>
                  </div>
                  <div className="paypal-amount">
                    <p>{t("payment.paypal.amount", { amount: (booking?.price || 0).toLocaleString() })}</p>
                  </div>
                  <div className="paypal-actions">
                    <button 
                      className="paypal-cancel" 
                      onClick={() => setShowPayPalModal(false)}
                    >
                      {t("payment.buttons.cancel")}
                    </button>
                    <button 
                      className="paypal-continue" 
                      onClick={handlePayPalContinue}
                    >
                      {t("payment.buttons.payNow")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;