// SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { destinationService } from "../services/api";
import { useTranslation } from "react-i18next";
import "./StylishSearchBar.css"; // Import our updated stylish CSS

const SearchBar = ({ className = "" }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef(null);
  const resultsRef = useRef(null);
  
  // Get current language
  const currentLang = i18n.language || 'en';

  // Function to safely get translated content
  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object' && contentObj !== null) {
      return contentObj[currentLang] || contentObj.en || fallback;
    }
    
    return contentObj;
  };

  // Fetch all destinations on component mount
  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const data = await destinationService.getAll();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations for search:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keep results visible on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isResultsVisible && resultsRef.current) {
        // Get the input's position
        const inputRect = searchContainerRef.current.querySelector('.search-input-wrapper').getBoundingClientRect();
        
        // Update the position of the results dropdown
        if (resultsRef.current) {
          resultsRef.current.style.top = `${inputRect.bottom}px`;
          resultsRef.current.style.left = `${inputRect.left}px`;
        }
      }
    };

    // Add scroll event listener when results are visible
    if (isResultsVisible) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isResultsVisible]);

  // Filter destinations when query changes
  useEffect(() => {
    if (!query.trim()) {
      setFilteredDestinations([]);
      return;
    }

    const searchQuery = query.toLowerCase().trim();
    const filtered = destinations.filter(destination => {
      const name = getTranslatedContent(destination.name, "");
      const location = destination.location || "";
      
      return (
        name.toLowerCase().includes(searchQuery) ||
        location.toLowerCase().includes(searchQuery)
      );
    });

    setFilteredDestinations(filtered);
  }, [query, destinations, currentLang]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsResultsVisible(true);
  };

  const handleDestinationClick = (destinationId) => {
    navigate(`/destinations/${destinationId}`);
    setQuery("");
    setIsResultsVisible(false);
  };

  return (
    <div className={`global-search-container ${className}`} ref={searchContainerRef}>
      <div className="global-search-stylish">
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder={t("searchDestinations", "Discover your next adventure...")}
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsResultsVisible(true)}
          />
          {query && (
            <button 
              className="clear-search" 
              onClick={() => {
                setQuery("");
                setFilteredDestinations([]);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {isResultsVisible && filteredDestinations.length > 0 && (
          <div className="search-results" ref={resultsRef}>
            {filteredDestinations.map((destination) => (
              <div
                key={destination._id}
                className="search-result-item"
                onClick={() => handleDestinationClick(destination._id)}
              >
                <div className="search-result-image">
                  {destination.image && (
                    <img src={destination.image} alt={getTranslatedContent(destination.name)} />
                  )}
                </div>
                <div className="search-result-content">
                  <h4>{getTranslatedContent(destination.name)}</h4>
                  <p>{destination.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {isResultsVisible && query && filteredDestinations.length === 0 && !loading && (
          <div className="search-results" ref={resultsRef}>
            <div className="no-results">{t("noDestinationsFound", "No destinations found")}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;