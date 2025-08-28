import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import "./DestinationMap.css";
import { getHighlightsArray } from "../utils/destinationUtils"; // Import the utility function
import mapService from "../services/mapService";

const DestinationMap = ({ destination, highlightLocations }) => {
  const { t, i18n } = useTranslation();
  const mapRef = useRef(null);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get current language
  const currentLang = i18n.language || 'en';
  
  // Initialize the map when component mounts
  useEffect(() => {
    if (!window.L) {
      // Load Leaflet CSS
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(linkEl);
      
      // Load Leaflet JS
      const scriptEl = document.createElement('script');
      scriptEl.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      scriptEl.onload = initializeMap;
      document.body.appendChild(scriptEl);
    } else {
      initializeMap();
    }
    
    return () => {
      // Clean up map on unmount
      if (map) {
        map.remove();
      }
    };
  }, []);

  
  // Update markers when highlight locations change
  useEffect(() => {
    if (map && highlightLocations && highlightLocations.length > 0) {
      setLoading(false);
      
      // Clear existing markers
      markers.forEach(marker => marker.remove());
      
      // Add new markers
      const newMarkers = [];
      
      // Filter out any invalid coordinate data
      const validHighlights = highlightLocations.filter(highlight => 
        highlight && 
        typeof highlight.lat === 'number' && 
        typeof highlight.lng === 'number' &&
        !isNaN(highlight.lat) && 
        !isNaN(highlight.lng)
      );
      
      validHighlights.forEach(highlight => {
        // Create custom icon based on whether location is approximate
        let markerIcon = null;
        
        if (highlight.approximate) {
          // Use a different colored marker for approximate locations
          markerIcon = window.L.divIcon({
            html: `<div class="approximate-marker" title="Approximate location">
                    <span class="marker-dot"></span>
                  </div>`,
            className: '',
            iconSize: [24, 24]
          });
        }
        
        const marker = window.L.marker(
          [highlight.lat, highlight.lng], 
          markerIcon ? { icon: markerIcon } : {}
        )
          .addTo(map)
          .bindPopup(`
            <b>${highlight.name}</b><br>
            ${highlight.description || ''} 
            ${highlight.approximate ? '<br><i>(Approximate location)</i>' : ''}
          `);
          
        marker.on('click', () => {
          setActiveHighlight(highlight.name);
        });
        
        newMarkers.push(marker);
      });
      
      setMarkers(newMarkers);
      
      // Set the map view to fit all markers only if we have valid markers
      if (newMarkers.length > 0) {
        try {
          const group = window.L.featureGroup(newMarkers);
          const bounds = group.getBounds();
          
          // Check if bounds are valid
          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [30, 30] });
          } else {
            // Fallback to a default view of Pakistan if bounds are invalid
            map.setView([35.8, 72.8], 6);
          }
        } catch (error) {
          console.warn("Could not fit map to bounds:", error);
          // Fallback to a default view
          map.setView([35.8, 72.8], 6);
        }
      } else {
        // No valid markers, set default view
        map.setView([35.8, 72.8], 6);
      }
    }
  }, [map, highlightLocations]);
  
  // Focus on a specific highlight when activeHighlight changes
  useEffect(() => {
    if (map && activeHighlight && highlightLocations) {
      const highlight = highlightLocations.find(h => h.name === activeHighlight);
      if (highlight && typeof highlight.lat === 'number' && typeof highlight.lng === 'number') {
        map.setView([highlight.lat, highlight.lng], 13);
        
        // Find and open the popup for this marker
        markers.forEach(marker => {
          const latLng = marker.getLatLng();
          if (latLng.lat === highlight.lat && latLng.lng === highlight.lng) {
            marker.openPopup();
          }
        });
      }
    }
  }, [activeHighlight, map, highlightLocations, markers]);
  
  const initializeMap = () => {
    if (!mapRef.current || mapRef.current._leaflet_id) return;
    
    // Create map centered on Pakistan
    const newMap = window.L.map(mapRef.current).setView([35.8, 72.8], 6);
    
    // Add OpenStreetMap tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);
    
    setMap(newMap);
  };
  
  const handleHighlightClick = (highlight) => {
    setActiveHighlight(highlight);
  };
  
  // Use the utility function to get highlights array
  const highlightsArray = getHighlightsArray(destination, currentLang);
  
  // Get available highlight names from the highlightLocations data
  const availableHighlightNames = highlightLocations ? 
    highlightLocations
      .filter(loc => loc && typeof loc.lat === 'number' && typeof loc.lng === 'number')
      .map(loc => loc.name) 
    : [];

  return (
    <div className="destination-map-container">
      <h2>{t("exploreHighlights", "Explore Highlights")}</h2>
      
      <div className="map-highlight-list">
        {highlightsArray.map((highlight, index) => {
          // Check if this highlight is available in the map markers
          const isAvailable = availableHighlightNames.includes(highlight);
          
          return (
            <button 
              key={index}
              className={`highlight-button 
                ${activeHighlight === highlight ? 'active' : ''} 
                ${isAvailable ? 'available' : 'unavailable'}`}
              onClick={() => isAvailable && handleHighlightClick(highlight)}
              disabled={!isAvailable}
              title={isAvailable ? highlight : `${highlight} (Location data not available)`}
            >
              {highlight}
            </button>
          );
        })}
      </div>
      
      <div className="map-container" ref={mapRef}></div>
      
      {loading ? (
        <p className="map-info-message">
          {t("mapDataInfo", "Loading map data...")}
        </p>
      ) : !highlightLocations || highlightLocations.length === 0 ? (
        <p className="map-info-message">
          {t("noHighlights", "No highlight locations are available for this destination.")}
        </p>
      ) : null}
      
      {!loading && highlightLocations && highlightLocations.some(h => h.approximate) && (
        <p className="map-note small text-gray-600 mt-2">
          {t("approximateLocations", "Note: Some locations are approximate and may not represent exact positions.")}
        </p>
      )}
    </div>
  );
};

export default DestinationMap;