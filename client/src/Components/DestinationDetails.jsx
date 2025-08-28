import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { destinationService } from "../services/api";
import "./DestinationDetail.css";
import ShareButtons from "./ShareButtons";
import WishlistButton from "./WishlistButton";
import ReviewForm from "./ReviewForm";
import CustomTourRequestForm from "./CustomTourRequestForm";
import DestinationMap from "./DestinationMap";
import mapService from "../services/mapService";
import { getHighlightsArray } from "../utils/destinationUtils";
import { useTranslation } from "react-i18next";
import hotelService from "../services/hotelService";


const DestinationDetail = () => {
  const { t, i18n } = useTranslation(); // Add i18n here
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("3days");
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [highlightLocations, setHighlightLocations] = useState([]);
const [destinationHotels, setDestinationHotels] = useState(null);

  
  // Get current language
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const data = await destinationService.getById(id);
        setDestination(data);
        setLoading(false);
      } catch (error) {
        setError(t("failedToLoadDestinations"));
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id, t]);


  useEffect(() => {
    const fetchHighlightLocations = async () => {
      if (destination && destination.highlights) {
        // Clear the location cache to ensure fresh lookups
        mapService.clearLocationCache();
        
        // Get the proper highlights array for current language
        const highlightsArray = getHighlightsArray(destination, currentLang);
        
        if (highlightsArray && highlightsArray.length > 0) {
          const locations = await mapService.getHighlightCoordinates(
            highlightsArray, 
            destination.location || "Pakistan"
          );
          console.log("Fetched highlight locations:", locations);
          setHighlightLocations(locations);
        } else {
          setHighlightLocations([]);
        }
      }
    };
  
    fetchHighlightLocations();
  }, [destination, currentLang]);


  useEffect(() => {
  if (destination) {
    // Get hotels for this destination
    const hotels = hotelService.getHotelsByDestination(destination.name);
    setDestinationHotels(hotels);
  }
}, [destination]);


  // Function to safely get translated content
  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object') {
      // Try current language first, then English, then first available key
      return contentObj[currentLang] || 
             contentObj.en || 
             Object.values(contentObj)[0] || 
             fallback;
    }
    
    return contentObj;
  };

  // Generate fake additional data if not present in the API response
  const enhanceDestinationData = (destination) => {
    if (!destination) return null;

    let processedHighlights;
  
  if (destination.highlights) {
    if (typeof destination.highlights === 'object' && !Array.isArray(destination.highlights)) {
      // It's already in the right format as an object with language keys
      processedHighlights = destination.highlights;
    } else if (Array.isArray(destination.highlights)) {
      // Convert array to object with language keys
      processedHighlights = {
        en: destination.highlights,
        fr: destination.highlights,
        es: destination.highlights,
        de: destination.highlights,
        zh: destination.highlights
      };
    } else {
      // Create empty language arrays
      processedHighlights = {
        en: [],
        fr: [],
        es: [],
        de: [],
        zh: []
      };
    }
  } else {
    // No highlights provided
    processedHighlights = {
      en: [],
      fr: [],
      es: [],
      de: [],
      zh: []
    };
  }

    
    // Get the translated name for use in descriptions
    const destinationName = getTranslatedContent(destination.name, "destination");
    
    // Default activities if not provided by API
    const activities = destination.activities || [
      t("activity1", "Sightseeing and photography of scenic landscapes"),
      t("activity2", "Hiking on beautiful mountain trails"),
      t("activity3", "Exploring local markets and handicrafts"),
      t("activity4", "Visiting historical sites and cultural landmarks"),
      t("activity5", "Experiencing local cuisine and traditional meals")
    ];
    
    // Default accommodation info if not provided by API
    const accommodation = destination.accommodation || {
      options: [
        { 
          name: t("standardHotel", "Standard Hotel"), 
          description: t("standardHotelDesc", "Comfortable rooms with basic amenities"), 
          priceAdjustment: 0 
        },
        { 
          name: t("luxuryResort", "Luxury Resort"), 
          description: t("luxuryResortDesc", "Spacious rooms with premium facilities and views"), 
          priceAdjustment: 15000 
        },
        { 
          name: t("localGuesthouse", "Local Guesthouse"), 
          description: t("localGuesthouseDesc", "Authentic experience with local families"), 
          priceAdjustment: -5000 
        }
      ]
    };
    
    // Default itinerary if not provided by API
    const itinerary = destination.itinerary || {
      "3days": [
        { 
          day: 1, 
          title: t("day1Title", "Arrival & Orientation"), 
          description: t("day1Desc", "Arrival at destination, check-in to accommodation, welcome dinner and briefing about the tour.") 
        },
        { 
          day: 2, 
          title: t("day2Title", "Exploration Day"), 
          description: t("day2Desc", `Full day exploring main attractions in ${destinationName} including guided tours and free time.`) 
        },
        { 
          day: 3, 
          title: t("day3Title", "Departure Day"), 
          description: t("day3Desc", "Morning leisure time, souvenir shopping, and departure to Lahore/Islamabad in the afternoon.") 
        }
      ],
      "5days": [
        { 
          day: 1, 
          title: t("day1Title", "Arrival & Orientation"), 
          description: t("day1Desc", "Arrival at destination, check-in to accommodation, welcome dinner and briefing about the tour.") 
        },
        { 
          day: 2, 
          title: t("day2Title5", "Local Exploration"), 
          description: t("day2Desc5", `Exploring main attractions in ${destinationName} with a local guide.`) 
        },
        { 
          day: 3, 
          title: t("day3Title5", "Adventure Day"), 
          description: t("day3Desc5", "Full day of outdoor activities and adventures appropriate to the destination.") 
        },
        { 
          day: 4, 
          title: t("day4Title", "Cultural Immersion"), 
          description: t("day4Desc", "Experiencing local culture, traditions, and cuisine with local community interactions.") 
        },
        { 
          day: 5, 
          title: t("day5Title", "Departure Day"), 
          description: t("day5Desc", "Morning leisure time, souvenir shopping, and departure to Lahore/Islamabad in the afternoon.") 
        }
      ],
      "7days": [
        { 
          day: 1, 
          title: t("day1Title", "Arrival & Orientation"), 
          description: t("day1Desc", "Arrival at destination, check-in to accommodation, welcome dinner and briefing about the tour.") 
        },
        { 
          day: 2, 
          title: t("day2Title5", "Local Exploration"), 
          description: t("day2Desc5", `Exploring main attractions in ${destinationName} with a local guide.`) 
        },
        { 
          day: 3, 
          title: t("day3Title5", "Adventure Day"), 
          description: t("day3Desc5", "Full day of outdoor activities and adventures appropriate to the destination.") 
        },
        { 
          day: 4, 
          title: t("day4Title", "Cultural Immersion"), 
          description: t("day4Desc", "Experiencing local culture, traditions, and cuisine with local community interactions.") 
        },
        { 
          day: 5, 
          title: t("day5Title7", "Hidden Gems Tour"), 
          description: t("day5Desc7", "Visiting off-the-beaten-path locations known mainly to locals.") 
        },
        { 
          day: 6, 
          title: t("day6Title", "Relaxation Day"), 
          description: t("day6Desc", "Free day to relax, revisit favorite spots, or try optional activities.") 
        },
        { 
          day: 7, 
          title: t("day7Title", "Departure Day"), 
          description: t("day7Desc", "Morning leisure time, souvenir shopping, and departure to Lahore/Islamabad in the afternoon.") 
        }
      ]
    };
    
    // Default reviews if not provided by API
    const reviews = destination.reviews || [
      { 
        name: "Ahmed K.", 
        rating: 5, 
        text: t("review1", `Absolutely amazing experience in ${destinationName}! The scenery was breathtaking and our guide was knowledgeable and friendly.`) 
      },
      { 
        name: "Fatima S.", 
        rating: 4, 
        text: t("review2", "Beautiful destination with great accommodation. Would have given 5 stars if the weather had been better.") 
      },
      { 
        name: "Saad M.", 
        rating: 5, 
        text: t("review3", "One of the best trips we've ever taken. Highly recommended for families!") 
      }
    ];
    
    // Default best time to visit if not provided
    const bestTimeToVisit = destination.bestTimeToVisit || t("bestTimeToVisit", "April to October");
    
    const defaultPrices = {
      "3days": 0,
      "5days": 0,
      "7days": 0
    };
    
    const destinationPrices = destination.price 
      ? {
          "3days": destination.price["3days"] || 0,
          "5days": destination.price["5days"] || 0,
          "7days": destination.price["7days"] || 0
        }
      : defaultPrices;
  

    return {
      ...destination,
      highlights: processedHighlights ,
      price: destinationPrices,
      activities,
      accommodation,
      itinerary,
      reviews,
      bestTimeToVisit
    };
  };

  
  const enhancedDestination = destination ? enhanceDestinationData(destination) : null;

  const handleReviewSubmitted = (newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
    alert(t("reviewSubmittedSuccessfully", "Your review has been submitted successfully!"));
    
  }

  const navigateToCustomTourForm = () => {
    navigate(`/customize-tour/${id}`);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{t("loadingDestinations", "Loading destination details...")}</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>🚧 {error}</p>
      <button onClick={() => window.location.reload()}>{t("tryAgain", "Try Again")}</button>
    </div>
  );

  if (!enhancedDestination) return <p>{t("destinationNotFound", "Destination not found")}</p>;

  // Get translated values for name and description
  const destinationName = getTranslatedContent(enhancedDestination.name, "Unnamed Destination");
  const destinationDescription = getTranslatedContent(enhancedDestination.description, "No description available");

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"} style={i <= rating ? {"animation-delay": `${i * 0.1}s`} : {}}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="destination-detail-container">
     <button className="back-button" onClick={() => navigate(-1)}>
  &larr; {typeof t("backToDestinations", "Back to Destinations") === 'object' 
    ? getTranslatedContent(t("backToDestinations", "Back to Destinations")) 
    : t("backToDestinations", "Back to Destinations")}
</button>
      
      <div className="destination-header">
        <div className="destination-title-container">
          <h1>{destinationName}</h1>

          {enhancedDestination.available ? (
  <span className="availability-badge available">
    {t("available", "Available")}
  </span>
) : (
  <span className="availability-badge unavailable">
    {t("unavailable", "Currently Unavailable")}
  </span>
)}
    <p className="location">{enhancedDestination.location}</p>

          
          {/* Feature badges */}
          <div className="feature-badges">
          {enhancedDestination.highlights && typeof enhancedDestination.highlights === 'object' 
  ? (Array.isArray(enhancedDestination.highlights[currentLang]) 
      ? enhancedDestination.highlights[currentLang].slice(0, 3).map((highlight, index) => (
          <span key={index} className="feature-badge" style={{"--badge-index": index}}>
            {highlight}
          </span>
        ))
      : Array.isArray(enhancedDestination.highlights.en) 
        ? enhancedDestination.highlights.en.slice(0, 3).map((highlight, index) => (
            <span key={index} className="feature-badge" style={{"--badge-index": index}}>
              {highlight}
            </span>
          ))
        : null)
  : Array.isArray(enhancedDestination.highlights) 
    ? enhancedDestination.highlights.slice(0, 3).map((highlight, index) => (
        <span key={index} className="feature-badge" style={{"--badge-index": index}}>
          {highlight}
        </span>
      ))
    : null
}
</div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="tabs-container">
      <div className="tabs">
      <button 
  className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
  onClick={() => setActiveTab('overview')}
>
  {typeof t("overview", "Overview") === 'object' 
    ? getTranslatedContent(t("overview", "Overview")) 
    : t("overview", "Overview")}
</button>

            <button className={`tab ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
          >
            {t("itinerary", "Itinerary")}
          </button>
          <button 
            className={`tab ${activeTab === 'accommodation' ? 'active' : ''}`}
            onClick={() => setActiveTab('accommodation')}
        >
            {t("accommodations", "Accommodations")}
          </button>

                    <button 
            className={`tab ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotels')}
          >
            {t("hotels", "Hotels")}
          </button>

          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
         >
            {t("reviews", "Reviews")}
          </button>
        </div>
      </div>
      
      <div className="destination-content">
        <div className="destination-info">
          {activeTab === 'overview' && (
            <>
              <div className="description-section">
                <h2>{t("about", "About")} {destinationName}</h2>
                <p>{destinationDescription}</p>
                
                <div className="destination-metadata">
                  <div className="metadata-item">
                    <h4>{t("bestTimeToVisitLabel", "Best Time to Visit")}</h4>
                    <p>{enhancedDestination.bestTimeToVisit}</p>
                  </div>
                  <div className="metadata-item">
                    <h4>{t("location", "Location")}</h4>
                    <p>{enhancedDestination.location}</p>
                  </div>
                  <div className="metadata-item">
                    <h4>{t("startingPrice", "Starting Price")}</h4>
                    <p>PKR {enhancedDestination.price && enhancedDestination.price["3days"] 
  ? enhancedDestination.price["3days"].toLocaleString() 
  : 'Price not available'}</p>
                  </div>
                </div>
                
                <h3>{t("activitiesExperiences", "Activities & Experiences")}</h3>
                <ul className="activities-list">
                  {enhancedDestination.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
              
              <div className="highlights-section">
  <h2>{t("highlights", "Highlights")}</h2>
  <ul className="highlights-list">
    {typeof enhancedDestination.highlights === 'object' 
      ? (Array.isArray(enhancedDestination.highlights[currentLang])
          ? enhancedDestination.highlights[currentLang].map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))
          : Array.isArray(enhancedDestination.highlights.en)
            ? enhancedDestination.highlights.en.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))
            : null)
      : Array.isArray(enhancedDestination.highlights)
        ? enhancedDestination.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))
        : null
    }
  </ul>
</div>

               <div className="map-section">
      <DestinationMap 
        destination={enhancedDestination} 
        highlightLocations={highlightLocations} 
      />
    </div>
            </>
          )}
          
          {activeTab === 'itinerary' && (
            <div className="itinerary-section">
              <h2>
                {t("tourItinerary", "Tour Itinerary")} ({selectedDuration === "3days" ? t("threeDays", "3 Days") : 
                selectedDuration === "5days" ? t("fiveDays", "5 Days") : t("sevenDays", "7 Days")})
              </h2>
              
              <div className="duration-selector">
                <div className="duration-options">
                                <button 
                  className={`duration-button ${selectedDuration === "3days" ? "active" : ""}`}
                  onClick={() => setSelectedDuration("3days")}
                >
                  {typeof t("threeDays", "3 Days") === 'object' 
                    ? getTranslatedContent(t("threeDays", "3 Days")) 
                    : t("threeDays", "3 Days")}
                </button>
                  <button 
                    className={`duration-button ${selectedDuration === "5days" ? "active" : ""}`}
                    onClick={() => setSelectedDuration("5days")}
                  >
                    {typeof t("fiveDays", "5 Days") === 'object'
                    ? getTranslatedContent (t("fiveDays", "5 Days"))
                   : t("fiveDays", "5 Days")}
                  </button>
                  <button 
                    className={`duration-button ${selectedDuration === "7days" ? "active" : ""}`}
                    onClick={() => setSelectedDuration("7days")}
                  >
                    {typeof t("sevenDays", "7 Days") === 'object'
                    ? getTranslatedContent (t("sevenDays", "7 Days"))
                   : t("sevenDays", "7 Days")}
                  </button>
                </div>
              </div>
              
              <div className="itinerary-timeline">
              {enhancedDestination.itinerary[selectedDuration].map((day, index) => (
                <div key={day.day} className="timeline-item" style={{"--timeline-index": index}}>
                  <div className="timeline-marker">
                    <span className="day-number">{day.day}</span>
                  </div>
                  <div className="timeline-content">
                    <h3>{day.title}</h3>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}
          
          {activeTab === 'accommodation' && (
            <div className="accommodation-section">
              <h2>{t("accommodationOptions", "Accommodation Options")}</h2>
              <p>{t("chooseAccommodation", "Choose from our carefully selected accommodation options:")}</p>
              
              <div className="accommodation-options">
                {enhancedDestination.accommodation.options.map((option, index) => (
                  <div key={index} className="accommodation-card">
                    <h3>{option.name}</h3>
                    <p>{option.description}</p>
                    <p className="price-adjustment">
                      {option.priceAdjustment === 0 ? 
                        t("includedInBasePrice", "Included in base price") : 
                        option.priceAdjustment > 0 ? 
                          t("additionalCost", "+PKR {{amount}} additional", {amount: option.priceAdjustment.toLocaleString()}) : 
                          t("discountAmount", "PKR {{amount}} discount", {amount: Math.abs(option.priceAdjustment).toLocaleString()})
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          
 {activeTab === 'hotels' && (
  <div className="hotels-section">
    <h2>{t("accommodationOptions", "Accommodation Options")} - {destinationName}</h2>
    
    {destinationHotels && destinationHotels.hotels ? (
      <div className="hotels-grid">
        {destinationHotels.hotels.map((hotel, index) => {
          // Helper function to get amenities array
          const getAmenitiesArray = (amenities) => {
            if (!amenities) return [];
            if (Array.isArray(amenities)) return amenities;
            if (typeof amenities === 'object') {
              return amenities[currentLang] || amenities.en || Object.values(amenities)[0] || [];
            }
            return [];
          };

          // Helper function to get room types array
          const getRoomTypesArray = (roomTypes) => {
            if (!roomTypes) return [];
            if (Array.isArray(roomTypes)) return roomTypes;
            if (typeof roomTypes === 'object') {
              return roomTypes[currentLang] || roomTypes.en || Object.values(roomTypes)[0] || [];
            }
            return [];
          };

          const amenitiesArray = getAmenitiesArray(hotel.amenities);
          const roomTypesArray = getRoomTypesArray(hotel.roomTypes);

          return (
            <div key={hotel.id} className="hotel-card" style={{"--hotel-index": index}}>
              <div className="hotel-image">
                <img src={hotel.image} alt={getTranslatedContent(hotel.name, hotel.name)} />
                <div className="hotel-category-badge">
                  {getTranslatedContent(hotel.category, hotel.category)}
                </div>
              </div>
              
              <div className="hotel-content">
                <div className="hotel-header">
                  <h3>{getTranslatedContent(hotel.name, hotel.name)}</h3>
                  <div className="hotel-rating">
                    {renderStars(hotel.rating)}
                  </div>
                </div>
                
                <p className="hotel-location">📍 {getTranslatedContent(hotel.location, hotel.location)}</p>
                <p className="hotel-description">{getTranslatedContent(hotel.description, hotel.description)}</p>
                
                {amenitiesArray.length > 0 && (
                  <div className="hotel-amenities">
                    <h4>{t("amenities", "Amenities")}:</h4>
                    <div className="amenities-list">
                      {amenitiesArray.map((amenity, idx) => (
                        <span key={idx} className="amenity-tag">
                          {getTranslatedContent(amenity, amenity)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {roomTypesArray.length > 0 && (
                  <div className="hotel-room-types">
                    <h4>{t("roomTypes", "Room Types")}:</h4>
                    <div className="room-types-list">
                      {roomTypesArray.map((roomType, idx) => (
                        <span key={idx} className="room-type-tag">
                          {getTranslatedContent(roomType, roomType)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="hotel-pricing">
                  {hotel.priceAdjustment === 0 ? (
                    <span className="price-included">{t("includedInPackage", "Included in Package")}</span>
                  ) : hotel.priceAdjustment > 0 ? (
                    <span className="price-additional">
                      +PKR {hotel.priceAdjustment.toLocaleString()} {t("additional", "additional")}
                    </span>
                  ) : (
                    <span className="price-discount">
                      PKR {Math.abs(hotel.priceAdjustment).toLocaleString()} {t("discount", "discount")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="no-hotels-message">
        <p>{t("noHotelsAvailable", "Hotel information not available for this destination.")}</p>
        <p>{t("contactForAccommodation", "Please contact us for accommodation arrangements.")}</p>
      </div>
    )}
  </div>
)}
       
{activeTab === 'reviews' && (
  <div className="reviews-section">
    <h2>{t("travelerReviews")}</h2>
    
    {/* Add the ReviewForm component here */}
    <div className="review-form-wrapper">
      <ReviewForm 
        destinationId={enhancedDestination._id} 
        onReviewSubmitted={handleReviewSubmitted} 
      />
    </div>
    
    <div className="reviews-list">
      {/* Show any newly added reviews first */}
      {reviews.map((review, index) => (
        <div key={`new-${index}`} className="review-card">
          <div className="review-header">
            <h3>{getTranslatedContent(review.title, "Review")}</h3>
            <div className="rating">
              {renderStars(review.rating)}
            </div>
          </div>
          <p className="review-text">{getTranslatedContent(review.comment, "No comment")}</p>
          <p className="review-date">{new Date(review.dateVisited).toLocaleDateString(currentLang)}</p>
          
          {/* Display review photos if any */}
          {review.photos && review.photos.length > 0 && (
            <div className="review-photos">
              {review.photos.map((photo, photoIndex) => (
                <img 
                  key={photoIndex} 
                  src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)} 
                  alt={`Review photo ${photoIndex + 1}`} 
                  className="review-photo-thumbnail"
                />
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* Show existing reviews */}
      {enhancedDestination.reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-header">
            <h3>{review.name}</h3>
            <div className="rating">
              {renderStars(review.rating)}
            </div>
          </div>
          <p className="review-text">{typeof review.text === 'object' ? getTranslatedContent(review.text) : review.text}</p>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
        

           
        < div className="booking-section">

          <h2>{t("planYourTrip", "Plan Your Trip")}</h2>

          <div className="wishlist-button-container">
    <WishlistButton destinationId={enhancedDestination._id} />
  </div>

                  <ShareButtons 
          url={window.location.href}
          title={`Check out ${destinationName} - ${enhancedDestination.location}`}
          description={destinationDescription}
          image={enhancedDestination.imageUrl} // Assuming you have an image URL
        />


<button 
  className={`customize-trip-button ${!enhancedDestination.available ? 'disabled' : ''}`}
  onClick={() => enhancedDestination.available ? navigateToCustomTourForm() : null}
  disabled={!enhancedDestination.available}
>
  {enhancedDestination.available
    ? t("customizeYourTrip", "Customize Your Trip to") + " " + destinationName
    : t("currentlyUnavailable", "Currently Unavailable")
  }
</button>

          <div className="duration-selector">
            <h3>{t("selectDuration", "Select Duration")}</h3>
            <div className="duration-options">
              <button 
                className={`duration-button ${selectedDuration === "3days" ? "active" : ""}`}
                onClick={() => setSelectedDuration("3days")}
              >
                {t("threeDays", "3 Days")}
              </button>
              <button 
                className={`duration-button ${selectedDuration === "5days" ? "active" : ""}`}
                onClick={() => setSelectedDuration("5days")}
              >
                {t("fiveDays", "5 Days")}
              </button>
              <button 
                className={`duration-button ${selectedDuration === "7days" ? "active" : ""}`}
                onClick={() => setSelectedDuration("7days")}
              >
                {t("sevenDays", "7 Days")}
              </button>
            </div>
          </div>
          
          <div className="price-info">
            <h3>{t("packagePrice", "Package Price")}</h3>
            <p className="price"> PKR {enhancedDestination.price && enhancedDestination.price[selectedDuration] 
    ? enhancedDestination.price[selectedDuration].toLocaleString() 
    : 'Price not available'}</p>
            <p className="price-includes">{t("priceIncludes", "Includes accommodation, guided tours, and transportation")}</p>
          </div>
          
          <div className="booking-features">
            <div className="feature">
              <span className="feature-icon">🏨</span>
              <span className="feature-text">{t("hotelAccommodation", "Hotel Accommodation")}</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🚘</span>
              <span className="feature-text">{t("transportation", "Transportation")}</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🍽️</span>
              <span className="feature-text">{t("dailyBreakfast", "Daily Breakfast")}</span>
            </div>
            <div className="feature">
              <span className="feature-icon">👨‍👩‍👧‍👦</span>
              <span className="feature-text">{t("localGuide", "Local Guide")}</span>
            </div>
          </div>
          <button 
  className={`book-now-button ${!enhancedDestination.available ? 'disabled' : ''}`}
  onClick={() => enhancedDestination.available ? navigate(`/booking/${enhancedDestination._id}`) : null}
  disabled={!enhancedDestination.available}
>
  {enhancedDestination.available 
    ? t("bookThisTrip", "Book This Trip")
    : t("currentlyUnavailable", "Currently Unavailable")
  }
</button>
          
          <div className="booking-info">
            <p><strong>{t("departureDates", "Departure Dates")}:</strong> {t("everySaturday", "Every Saturday")}</p>
            <p><strong>{t("groupSize", "Group Size")}:</strong> {t("maximumPeople", "Maximum 15 people")}</p>
            <p><strong>{t("bookingPolicy", "Booking Policy")}:</strong> {t("advancePayment", "50% advance payment required")}</p>
          </div>
        </div>
      </div>
    </div>
    )
};

export default DestinationDetail;