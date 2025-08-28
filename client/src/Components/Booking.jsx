import React, { useState, useEffect } from "react";
import { destinationService, bookingService } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { formatPKR } from "../utils/currencyUtils";
import { useTranslation } from "react-i18next";
import "./Booking.css";

const Booking = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("3days");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [accommodationPriceAdjustment, setAccommodationPriceAdjustment] = useState(0);
  const [travelers, setTravelers] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPricePKR, setTotalPricePKR] = useState(0);

  const currentLang = i18n.language || 'en';

  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object' && contentObj !== null) {
      return contentObj[currentLang] || contentObj.en || fallback;
    }
    
    return contentObj;
  };

  // User ID would typically come from authentication context
  const userId = localStorage.getItem('userId') || "user123"; // Fallback for testing

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const data = await destinationService.getById(id);
        setDestination(data);
        
        // Set default accommodation
        if (data.accommodation && data.accommodation.options.length > 0) {
          setSelectedAccommodation(data.accommodation.options[0].name);
          setAccommodationPriceAdjustment(data.accommodation.options[0].priceAdjustment || 0);
        }
        
        // Set initial price based on selected duration
        if (data.price && data.price[selectedDuration]) {
          setBasePrice(data.price[selectedDuration]);
          // Calculate initial total price
          const initialTotal = data.price[selectedDuration] * travelers;
          setTotalPrice(initialTotal);
          setTotalPricePKR(initialTotal); // PKR price is the same as base price for this app
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination:", error);
        setError(t('booking.errors.failedToLoad', "Failed to load destination details"));
        setLoading(false);
      }
    };
    
    fetchDestination();
  }, [id, selectedDuration, t]);

  // Update accommodation price adjustment when accommodation selection changes
  useEffect(() => {
    if (destination && destination.accommodation) {
      const selectedOption = destination.accommodation.options.find(
        option => option.name === selectedAccommodation
      );
      
      if (selectedOption) {
        setAccommodationPriceAdjustment(selectedOption.priceAdjustment || 0);
      }
    }
  }, [selectedAccommodation, destination]);

  // Update price calculations when relevant factors change
  useEffect(() => {
    if (destination && destination.price) {
      // Get base price for selected duration
      const durationBasePrice = destination.price[selectedDuration] || 0;
      
      // Calculate total based on travelers and accommodation adjustment
      let newTotalPrice = durationBasePrice * travelers;
      
      // Add accommodation price adjustment
      newTotalPrice += accommodationPriceAdjustment;
      
      // Ensure price isn't negative
      newTotalPrice = Math.max(0, newTotalPrice);
      
      // Update price states
      setTotalPrice(newTotalPrice);
      setTotalPricePKR(newTotalPrice); // In this app, PKR is the same as base price
    }
  }, [travelers, selectedDuration, accommodationPriceAdjustment, destination]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccommodationChange = (e) => {
    const selectedAccom = e.target.value;
    setSelectedAccommodation(selectedAccom);
    
    if (destination && destination.accommodation) {
      const selectedOption = destination.accommodation.options.find(
        option => option.name === selectedAccom
      );
      
      if (selectedOption) {
        setAccommodationPriceAdjustment(selectedOption.priceAdjustment || 0);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate) {
      setError(t('booking.errors.selectDate', "Please select a travel date"));
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Create booking data
      const bookingData = {
        userId,
        destination: id,
        date: new Date(selectedDate),
        bookingDetails: {
          duration: selectedDuration,
          travelers: parseInt(travelers),
          accommodation: selectedAccommodation,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          firstName: bookingDetails.firstName,        // ← ADD THIS
    lastName: bookingDetails.lastName,          // ← ADD THIS
    specialRequests: bookingDetails.specialRequests  // ← ADD THIS
        },
        price: totalPricePKR,
        currency: "PKR"
      };
      
      const booking = await bookingService.createBooking(bookingData);
      
      // Store user email in localStorage for payment page
      localStorage.setItem('userEmail', bookingDetails.email);
      
      // Redirect to payment page with booking data
      navigate(`/payment/${booking._id}`, { 
        state: { 
          bookingData: booking
        } 
      });
      
    } catch (err) {
      console.error("Booking error:", err);
      setError(t('booking.errors.bookingFailed', "Failed to complete booking. Please try again."));
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{t('booking.loading', "Loading booking details...")}</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p className="error-message">🚧 {error}</p>
      <button onClick={() => window.location.reload()}>{t('tryAgain', "Try Again")}</button>
    </div>
  );

  return (
    <div className="booking-page-container">
      <h1>{t('booking.title', "Book Your Trip to")} {getTranslatedContent(destination?.name, t('booking.defaultDestination', "Destination"))}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>{t('booking.sections.tripDetails', "Trip Details")}</h2>
          
          <div className="form-group">
            <label>{t('booking.fields.travelDate', "Travel Date:")}</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="form-group">
            <label>{t('booking.fields.duration', "Duration:")}</label>
            <select 
              value={selectedDuration} 
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="3days">{t('booking.durations.3days', "3 Days")}</option>
              <option value="5days">{t('booking.durations.5days', "5 Days")}</option>
              <option value="7days">{t('booking.durations.7days', "7 Days")}</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>{t('booking.fields.travelers', "Number of Travelers:")}</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={travelers} 
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              required
            />
          </div>
          
          {destination?.accommodation && (
            <div className="form-group">
              <label>{t('booking.fields.accommodation', "Accommodation:")}</label>
              <select
                value={selectedAccommodation}
                onChange={handleAccommodationChange}
              >
                {destination.accommodation.options.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name} {option.priceAdjustment !== 0 && 
                      (option.priceAdjustment > 0 
                        ? `(+PKR ${option.priceAdjustment.toLocaleString()})` 
                        : `(PKR ${option.priceAdjustment.toLocaleString()})`
                      )
                    }
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <div className="form-section">
          <h2>{t('booking.sections.contactInfo', "Contact Information")}</h2>
          
          <div className="form-group">
            <label>{t('booking.fields.firstName', "First Name:")}</label>
            <input
              type="text"
              name="firstName"
              value={bookingDetails.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>{t('booking.fields.lastName', "Last Name:")}</label>
            <input
              type="text"
              name="lastName"
              value={bookingDetails.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>{t('booking.fields.email', "Email:")}</label>
            <input
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>{t('booking.fields.phone', "Phone:")}</label>
            <input
              type="tel"
              name="phone"
              value={bookingDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>{t('booking.fields.specialRequests', "Special Requests:")}</label>
            <textarea
              name="specialRequests"
              value={bookingDetails.specialRequests}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="form-section payment-section">
          <h2>{t('booking.sections.bookingSummary', "Booking Summary")}</h2>
          
          <div className="price-display">
            <p className="price-breakdown">
              <strong>{t('booking.payment.basePrice', "Base Price:")}</strong> PKR {formatPKR(destination.price[selectedDuration] || 0)} × {travelers} {t('booking.payment.travelers', "travelers")}
            </p>
            {accommodationPriceAdjustment !== 0 && (
              <p className="price-breakdown">
                <strong>{t('booking.payment.accommodationAdjustment', "Accommodation Adjustment:")}</strong> {accommodationPriceAdjustment > 0 ? '+' : ''}
                PKR {formatPKR(accommodationPriceAdjustment)}
              </p>
            )}
            <p className="total-price">
              <strong>{t('booking.payment.totalPrice', "Total Price:")}</strong> PKR {formatPKR(totalPricePKR)}
            </p>
          </div>
          
          <div className="payment-security-info">
            <div className="security-icon">🔒</div>
            <p>{t('booking.payment.securityInfo', "After submitting, you'll be directed to our secure payment page.")}</p>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="submit-booking" 
          disabled={submitting}
        >
          {submitting 
            ? t('booking.buttons.processing', "Processing...") 
            : t('booking.buttons.continueToPayment', "Continue to Payment")
          }
        </button>
      </form>
    </div>
  );
};

export default Booking;