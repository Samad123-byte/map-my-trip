import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { destinationService } from "../services/api";
import { useTranslation } from "react-i18next";
import { convertUSDToPKR, formatPKR } from '../utils/currencyUtils';
import './scroll-animation.js';
import "./Home.css";


const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Add i18n here
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDuration, setActiveDuration] = useState("week");
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  // Get current language
  const currentLang = i18n.language || 'en';

  // Duration mapping to price keys
  const durationToKey = {
    weekend: "3days",
    week: "5days",
    extended: "7days"
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getAll();
        console.log("Fetched destinations:", data); // Debug log

        data.forEach(destination => {
          console.log(`Destination: ${destination.name?.en || 'Unnamed'}`, {
            price: destination.price,
            weekend: destination.price?.["3days"],
            week: destination.price?.["5days"],
            extended: destination.price?.["7days"]
          });
        });

        setDestinations(data);
        setFilteredDestinations(data);
        setLoading(false);
      } catch (error) {
        console.error("Detailed error:", error);
        setError(t('failedToLoadDestinations'));
        setLoading(false);
      }
    };
  
    fetchDestinations();
  }, [t]);
  
  // Filter destinations based on selected duration
  useEffect(() => {
    if (destinations.length > 0) {
      // Sort destinations by price for the selected duration (lowest first)
      const sorted = [...destinations].sort((a, b) => {
        const priceA = a.price[durationToKey[activeDuration]] || 0;
        const priceB = b.price[durationToKey[activeDuration]] || 0;
        return priceA - priceB;
      });
      
      setFilteredDestinations(sorted);
    }
  }, [activeDuration, destinations]);

  // Function to safely get translated content
  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object' && contentObj !== null) {
      return contentObj[currentLang] || contentObj.en || fallback;
    }
    
    return contentObj;
  };


  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{t('loadingDestinations')}</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>🚧 {error}</p>
      <button onClick={() => window.location.reload()}>{t('tryAgain')}</button>
    </div>
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section" style={{ 
  backgroundImage: "url('/pexe.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",

      }}>
        <div className="hero-content">
          <h1>{t('discoverNextAdventure')}</h1>
          <p>
            {t('heroDescription')}
          </p>

          <button className="cta-button" onClick={() => navigate("/destinations")}>
            {t('startExploring')}
          </button>
        </div>
      </div>

      

      {/* Introduction Section */}
      <div className="intro-section">
        <h2>{t('journeyBeginsHere')}</h2>
        <p>
          {t('introDescription')}
        </p>
      </div>

      {/* Duration Selector */}
      <div className="duration-selector">
        <h3>{t('idealVacationLength')}</h3>
        <div className="duration-options">
          <button 
            className={`duration-button ${activeDuration === "weekend" ? "active" : ""}`}
            onClick={() => setActiveDuration("weekend")}
          >
            {t('threeDays')}
          </button>
          <button 
            className={`duration-button ${activeDuration === "week" ? "active" : ""}`}
            onClick={() => setActiveDuration("week")}
          >
            {t('fiveDays')}
          </button>
          <button 
            className={`duration-button ${activeDuration === "extended" ? "active" : ""}`}
            onClick={() => setActiveDuration("extended")}
          >
            {t('sevenDays')}
          </button>
        </div>
      </div>

      <div className="main-content-with-sidebar">
      <div className="main-content">

      <h2>{t('popularDestinations')}</h2>
      <div className="destinations-grid">
        {filteredDestinations.slice(0, 4).map((destination) => (
          <div key={destination._id} className="destination-card">
            <div 
              className="destination-image" 
              style={{ backgroundImage: `url(${destination.image})` }}
            >
               
               <div className="image-overlay">
                <h3 className="overlay-title">{getTranslatedContent(destination.name, "Unnamed Destination")}</h3>
                <p className="overlay-location">{destination.location}</p>
              </div>
            </div>

            <div className="destination-content">

              <p className="destination-description">
                {getTranslatedContent(destination.description, "No description available")}
              </p>
              <div className="destination-footer">
                <div className="destination-price">
                  <span className="price-label">{t('from')}</span>
                  <span className="price-value">
                    {(() => {
                      const durationKey = durationToKey[activeDuration];
                      return destination.price && destination.price[durationKey] 
                        ? formatPKR(convertUSDToPKR(destination.price[durationKey]))
                        : 'N/A';
                    })()}
                  </span>
                  <span className="duration-label">
                    {activeDuration === "weekend" ? t('threeDays') : 
                     activeDuration === "week" ? t('fiveDays') : 
                     t('sevenDays')}
                  </span>
                </div>
                <button 
                  className="view-details-button" 
                  onClick={() => navigate(`/destinations/${destination._id}`)}
                >
                  {t('viewDetails')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  </div>


      <button className="view-all-button" onClick={() => navigate("/destinations")}>
        {t('viewAllDestinations')}
      </button>
      
      {/* CTA Section */}
      <div className="cta-section">
        <h2>{t('readyForNextAdventure')}</h2>
        <p>
          {t('ctaDescription')}
        </p>
        <div className="cta-buttons">
          <button className="primary-button" onClick={() => navigate("/destinations")}>
            {t('findYourTrip')}
          </button>
          <button className="secondary-button" onClick={() => navigate("/contact")}>
            {t('contactExperts')}
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Home;