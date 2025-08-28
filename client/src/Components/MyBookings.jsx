import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bookingService, destinationService, customTourService } from "../services/api"; 
import { useTranslation } from "react-i18next";
import ShareButtons from "./ShareButtons";
import ConfirmationModal from "./ConfirmationModal"; // Add this import
import "./MyBookings.css";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [customTours, setCustomTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  // Add state for confirmation modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'regular', // 'regular' or 'custom'
    bookingId: null,
    message: ''
  });

  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object' && contentObj !== null) {
      return contentObj[currentLang] || contentObj.en || fallback;
    }
    
    return contentObj;
  };

  // Add this to your MyBookings component
  useEffect(() => {
    // Set animation delay index for each card after bookings are loaded
    if (!loading && (bookings.length > 0 || customTours.length > 0)) {
      const cards = document.querySelectorAll('.booking-card');
      cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
      });
    }
  }, [loading, bookings, customTours]);

  // Function to check if user is still authenticated
  const checkAuthStatus = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    return userId && token;
  };

  // Function to handle authentication changes
  const handleAuthChange = () => {
    if (!checkAuthStatus()) {
      // User is no longer authenticated, clear bookings and redirect
      setBookings([]);
      setCustomTours([]);
      setLoading(false);
      navigate('/login', { state: { redirectTo: '/my-bookings' } });
    }
  };

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        // Get userId from localStorage or redirect to login
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/login', { state: { redirectTo: '/my-bookings' } });
          return;
        }

        // Fetch both regular bookings and custom tour requests
        const [bookingsData, customToursData] = await Promise.all([
          bookingService.getUserBookings(userId),
          customTourService.getUserRequests()
        ]);
        
        // Enhance the bookings data with full destination details if needed
        const enhancedBookings = await Promise.all(bookingsData.map(async (booking) => {
          // If destination is just an ID, fetch the full destination details
          if (booking.destination && typeof booking.destination === 'string') {
            try {
              const destinationData = await destinationService.getById(booking.destination);
              return {
                ...booking,
                destination: destinationData
              };
            } catch (err) {
              console.error("Error fetching destination details:", err);
              return booking;
            }
          }
          return booking;
        }));

        // Enhance custom tours with destination details
        const enhancedCustomTours = await Promise.all(customToursData.map(async (tour) => {
          if (tour.preferredDestinations && tour.preferredDestinations.length > 0) {
            try {
              const destinationData = await destinationService.getById(tour.preferredDestinations[0]);
              return {
                ...tour,
                destination: destinationData,
                isCustomTour: true
              };
            } catch (err) {
              console.error("Error fetching destination details for custom tour:", err);
              return {
                ...tour,
                isCustomTour: true
              };
            }
          }
          return {
            ...tour,
            isCustomTour: true
          };
        }));
        
        setBookings(enhancedBookings);
        setCustomTours(enhancedCustomTours);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(t('myBookings.error'));
        setLoading(false);
      }
    };

    // Check authentication status before fetching
    if (checkAuthStatus()) {
      fetchUserBookings();
    } else {
      navigate('/login', { state: { redirectTo: '/my-bookings' } });
    }

    // Listen for authentication changes (logout events)
    window.addEventListener('authChange', handleAuthChange);
    
    // Also listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'userId' || e.key === 'token') {
        if (!e.newValue) {
          // Key was removed (user logged out)
          handleAuthChange();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate, t]);

  // Updated cancel booking function
  const cancelBooking = async (bookingId) => {
    setConfirmModal({
      isOpen: true,
      type: 'regular',
      bookingId: bookingId,
      message: t('myBookings.actions.confirmCancel')
    });
  };

  // Updated cancel custom tour function
  const cancelCustomTour = async (tourId) => {
    setConfirmModal({
      isOpen: true,
      type: 'custom',
      bookingId: tourId,
      message: t('myBookings.actions.confirmCancel')
    });
  };

  // Handle confirmation modal actions
  const handleConfirmCancel = async () => {
    try {
      if (confirmModal.type === 'regular') {
        await bookingService.cancelBooking(confirmModal.bookingId);
        setBookings(bookings.filter(booking => booking._id !== confirmModal.bookingId));
      } else {
        await customTourService.cancelRequest(confirmModal.bookingId);
        setCustomTours(customTours.filter(tour => tour._id !== confirmModal.bookingId));
      }
      setConfirmModal({ isOpen: false, type: 'regular', bookingId: null, message: '' });
    } catch (error) {
      setError(t('myBookings.error'));
      setConfirmModal({ isOpen: false, type: 'regular', bookingId: null, message: '' });
    }
  };

  const handleCancelModal = () => {
    setConfirmModal({ isOpen: false, type: 'regular', bookingId: null, message: '' });
  };

  // Helper function to safely get destination name
  const getDestinationName = (booking) => {
    if (!booking.destination) return t('myBookings.bookingDetails.unknownDestination', 'Unknown Destination');
    
    if (typeof booking.destination === 'object' && booking.destination.name) {
      return getTranslatedContent(booking.destination.name, t('myBookings.bookingDetails.unknownDestination', 'Unknown Destination'));
    }
    
    return t('myBookings.bookingDetails.unknownDestination', 'Unknown Destination');
  };

  // Helper function to safely get destination location
  const getDestinationLocation = (booking) => {
    if (!booking.destination) return '';
    
    if (typeof booking.destination === 'object' && booking.destination.location) {
      return getTranslatedContent(booking.destination.location, '');
    }
    
    return '';
  };

  // Helper function to get destination ID
  const getDestinationId = (booking) => {
    if (!booking.destination) return '';
    
    if (typeof booking.destination === 'object' && booking.destination._id) {
      return booking.destination._id;
    }
    
    return booking.destination; // Assume it's an ID string
  };

  // Helper function to format duration
  const formatDuration = (durationCode) => {
    return t(`myBookings.durations.${durationCode}`, durationCode);
  };

  // Helper function to format custom tour date range
  const formatCustomTourDates = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString(currentLang);
    const end = new Date(endDate).toLocaleDateString(currentLang);
    return `${start} - ${end}`;
  };

  // Helper function to get status display for custom tours
  const getCustomTourStatus = (status) => {
    const statusMap = {
      'pending': 'Pending Review',
      'quoted': 'Quote Provided',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{t('myBookings.loading')}</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>🚧 {error}</p>
      <button onClick={() => window.location.reload()}>{t('tryAgain', 'Try Again')}</button>
    </div>
  );

  // Combine and sort all bookings and custom tours by date
  const allBookings = [
    ...bookings.map(booking => ({ ...booking, type: 'regular' })),
    ...customTours.map(tour => ({ 
      ...tour, 
      type: 'custom',
      date: tour.startDate // Use startDate for sorting
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (allBookings.length === 0) {
    return (
      <div className="my-bookings-container">
        <h1>{t('myBookings.title')}</h1>
        <div className="no-bookings">
          <p>{t('myBookings.noBookings')}</p>
          <button onClick={() => navigate('/destinations')}>
            {t('myBookings.exploreDestinations')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-container">
      <h1>{t('myBookings.title')}</h1>
      
      <div className="bookings-list">
        {allBookings.map((booking) => (
          <div className="booking-card" key={`${booking.type}-${booking._id}`}>

            <ShareButtons 
              url={window.location.href}
              title={t('myBookings.shareTitle', {destination: getDestinationName(booking)}, `My upcoming trip to ${getDestinationName(booking)}`)}
              description={t('myBookings.shareDescription', {
                destination: getDestinationName(booking),
                location: getDestinationLocation(booking) ? t('myBookings.shareLocation', {location: getDestinationLocation(booking)}, `in ${getDestinationLocation(booking)}`) : ''
              }, `I'm going to ${getDestinationName(booking)} ${getDestinationLocation(booking) ? `in ${getDestinationLocation(booking)}` : ''}`)}
              image={booking.destination && booking.destination.imageUrl} // If available
            />

            <div className="booking-header">
              <h2>
                {getDestinationName(booking)}
                {booking.type === 'custom' && (
                  <span className="custom-tour-badge"> (Custom Tour)</span>
                )}
              </h2>
              <span className={`status-badge ${(booking.status || '').toLowerCase()}`}>
                {booking.type === 'custom' ? getCustomTourStatus(booking.status) : booking.status}
              </span>
            </div>
            
            <div className="booking-details">
              <div className="booking-info">
                <p><strong>{t('myBookings.bookingDetails.bookingId')}</strong> {booking._id}</p>
                <p>
                  <strong>{t('myBookings.bookingDetails.destination')}</strong> {getDestinationName(booking)}
                  {getDestinationLocation(booking) && `, ${getDestinationLocation(booking)}`}
                </p>
                
                {booking.type === 'regular' ? (
                  <>
                    <p><strong>{t('myBookings.bookingDetails.date')}</strong> {new Date(booking.date).toLocaleDateString(currentLang)}</p>
                    {booking.bookingDetails && (
                      <>
                        <p><strong>{t('myBookings.bookingDetails.duration')}</strong> {formatDuration(booking.bookingDetails.duration)}</p>
                        <p><strong>{t('myBookings.bookingDetails.travelers')}</strong> {booking.bookingDetails.travelers}</p>
                        {booking.bookingDetails.accommodation && (
                          <p><strong>{t('myBookings.bookingDetails.accommodation')}</strong> {booking.bookingDetails.accommodation}</p>
                        )}
                      </>
                    )}
                    {booking.price && (
                      <p><strong>{t('myBookings.bookingDetails.totalPrice')}</strong> PKR {booking.price.toLocaleString(currentLang)}</p>
                    )}
                  </>
                ) : (
                  <>
                    <p><strong>Travel Dates:</strong> {formatCustomTourDates(booking.startDate, booking.endDate)}</p>
                    <p><strong>{t('myBookings.bookingDetails.travelers')}</strong> {booking.numberOfTravelers}</p>
                    <p><strong>Budget Range:</strong> PKR {booking.budget ? booking.budget.toLocaleString(currentLang) : 'Not specified'}</p>
                    <p><strong>Accommodation:</strong> {booking.accommodationPreference || 'Standard'}</p>
                    {booking.activities && booking.activities.length > 0 && (
                      <p><strong>Preferred Activities:</strong> {booking.activities.join(', ')}</p>
                    )}
                    {booking.specialRequirements && (
                      <p><strong>Special Requirements:</strong> {booking.specialRequirements}</p>
                    )}
                    {booking.quote && (
                      <p><strong>Quoted Price:</strong> PKR {booking.quote.toLocaleString(currentLang)}</p>
                    )}
                  </>
                )}
              </div>
            </div>
            
            <div className="booking-actions">
              {booking.type === 'regular' ? (
                <>
                  {booking.status === 'pending' || booking.status === 'confirmed' ? (
                    <button 
                      className="cancel-button"
                      onClick={() => cancelBooking(booking._id)}
                    >
                      {t('myBookings.actions.cancelBooking')}
                    </button>
                  ) : null}
                  
                  <button 
                    className="view-button"
                    onClick={() => navigate(`/destinations/${getDestinationId(booking)}`)}
                  >
                    {t('myBookings.actions.viewDestination')}
                  </button>
                </>
              ) : (
                <>
                  {booking.status === 'pending' || booking.status === 'quoted' ? (
                    <button 
                      className="cancel-button"
                      onClick={() => cancelCustomTour(booking._id)}
                    >
                      Cancel Request
                    </button>
                  ) : null}
                  
                  {booking.destination && (
                    <button 
                      className="view-button"
                      onClick={() => navigate(`/destinations/${getDestinationId(booking)}`)}
                    >
                      {t('myBookings.actions.viewDestination')}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add the confirmation modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={handleCancelModal}
        onConfirm={handleConfirmCancel}
        title="Cancel Booking"
        message={confirmModal.message}
        confirmText="Cancel Booking"
        cancelText="Keep Booking"
        type="warning"
      />
    </div>
  );
};

export default MyBookings;