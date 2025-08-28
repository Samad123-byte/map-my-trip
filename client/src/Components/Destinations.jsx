import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { destinationService } from "../services/api"; 
import { useTranslation } from "react-i18next";
import { convertUSDToPKR, formatPKR } from '../utils/currencyUtils';
import SearchBar from "./SearchBar"
import "./Destinations.css";

const Destinations = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDuration, setActiveDuration] = useState("week");
  
  // Duration mapping to price keys
  const durationToKey = {
    weekend: "3days",
    week: "5days",
    extended: "7days"
  };

  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getAll();
        console.log("Fetched destinations:", data);
        setDestinations(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setError(t('failedToLoadDestinations'));
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [t]);

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
    <div className="destinations-container">
      <h1>{t('exploreOurDestinations')}</h1>

      <div className="destinations-search-container">
        <SearchBar className="destinations-search" placeholder={t('searchPlaceholder')} />
      </div>

      {/* Duration Selector */}
      <div className="duration-selector">
        <div className="duration-options">
          <button 
            className={`duration-button ${activeDuration === "weekend" ? "active" : ""}`}
            onClick={() => setActiveDuration("weekend")}
          >
            3 Days
          </button>
          <button 
            className={`duration-button ${activeDuration === "week" ? "active" : ""}`}
            onClick={() => setActiveDuration("week")}
          >
            5 Days
          </button>
          <button 
            className={`duration-button ${activeDuration === "extended" ? "active" : ""}`}
            onClick={() => setActiveDuration("extended")}
          >
            7 Days
          </button>
        </div>
      </div>

      <div className="destinations-grid">
        {destinations.map((destination) => {
          const name = getTranslatedContent(destination.name, "Unnamed Destination");
          const description = getTranslatedContent(destination.description, "No description available");
          
          const durationKey = durationToKey[activeDuration];
          const price = destination.price && destination.price[durationKey] 
            ? formatPKR(convertUSDToPKR(destination.price[durationKey]))
            : 'N/A';
            
          return (
            <div key={destination._id} className="destination-card">
              <div
                className="destination-image"
                style={{ backgroundImage: `url(${destination.image})` }}
              >
                <div className="image-overlay">
                  <h3 className="overlay-title">{name}</h3>
                  <p className="overlay-location">{destination.location || t('locationUnavailable')}</p>
                </div>
              </div>
              <div className="destination-content">
                <p className="destination-description">
                  {description}
                </p>
                <div className="destination-footer">
                  <div className="destination-price">
                    <span className="price-label">{t('from')}</span>
                    <span className="price-value">{price}</span>
                    <span className="duration-label">
                      {activeDuration === "weekend" ? "3 Days" : 
                       activeDuration === "week" ? "5 Days" : 
                       "7 Days"}
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
          )
        })}
      </div>
    </div>
  )
}

export default Destinations;