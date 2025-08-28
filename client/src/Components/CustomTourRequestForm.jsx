import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customTourService, userService, destinationService } from "../services/api";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../App";
import "./CustomTourRequestForm.css";

const CustomTourRequestForm = ({ destinationId, destinationName }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    numberOfTravelers: 1,
    travelPreferences: [],
    accommodationPreference: "Standard",
    budgetRange: "medium",
    specialRequirements: "",
    includeTransportation: true,
    includeGuide: true,
    includeMeals: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  
  // Refs for scrolling to messages
  const successMessageRef = useRef(null);
  const errorMessageRef = useRef(null);

  // Check login status and fetch user profile on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isUserLoggedIn = !!token;
    setIsLoggedIn(isUserLoggedIn);
    
    if (isUserLoggedIn) {
      fetchUserProfile();
    }
  }, []);

  useEffect(() => {
    // If destinationId and destinationName are not provided as props, fetch them
    if (!destinationId && id) {
      const fetchDestinationInfo = async () => {
        try {
          const data = await destinationService.getById(id);
          setDestinationInfo(data);
        } catch (err) {
          console.error("Error fetching destination:", err);
        }
      };
      
      fetchDestinationInfo();
    }
  }, [destinationId, id]);

  // Auto-scroll to success message when it appears
  useEffect(() => {
    if (success && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [success]);

  // Auto-scroll to error message when it appears
  useEffect(() => {
    if (error && errorMessageRef.current) {
      errorMessageRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [error]);
  
  // Use either the props or the fetched data
  const effectiveDestinationId = destinationId || id;
  const effectiveDestinationName = destinationName || (destinationInfo ? destinationInfo.Name : "");

  const fetchUserProfile = async () => {
    try {
      const profile = await userService.getUserProfile();
      setUserProfile(profile);
      
      // Pre-fill the form with user data
      setFormData(prevState => ({
        ...prevState,
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || ""
      }));
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      if (name === "travelPreferences") {
        let updatedPreferences = [...formData.travelPreferences];
        if (checked) {
          updatedPreferences.push(value);
        } else {
          updatedPreferences = updatedPreferences.filter(pref => pref !== value);
        }
        setFormData({ ...formData, travelPreferences: updatedPreferences });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      // Redirect to login page with a return URL
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Transform form data to match backend expectations
      const tourRequestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredDestinations: [effectiveDestinationId],
        startDate: formData.startDate,
        endDate: formData.endDate,
        numberOfTravelers: parseInt(formData.numberOfTravelers, 10),
        budget: getBudgetValue(formData.budgetRange),
        accommodationPreference: formData.accommodationPreference,
        activities: formData.travelPreferences,
        specialRequirements: `${formData.specialRequirements}
${formData.includeTransportation ? "Include transportation." : ""}
${formData.includeGuide ? "Include tour guide." : ""}
${formData.includeMeals ? "Include all meals." : ""}`
      };
      
      await customTourService.submitRequest(tourRequestData);
      setSuccess(true);
      setLoading(false);
      
      // Reset form after successful submission
      setFormData({
        name: userProfile?.name || "",
        email: userProfile?.email || "",
        phone: userProfile?.phone || "",
        startDate: "",
        endDate: "",
        numberOfTravelers: 1,
        travelPreferences: [],
        accommodationPreference: "Standard",
        budgetRange: "medium",
        specialRequirements: "",
        includeTransportation: true,
        includeGuide: true,
        includeMeals: false,
      });
      
      // When used as a page, redirect to the destination details after submission
      if (!destinationId && id) {
        setTimeout(() => {
          navigate(`/destinations/${id}`);
        }, 3000);
      } else {
        // Collapse the form after submission when used as embedded component
        setTimeout(() => {
          setExpanded(false);
          setSuccess(false);
        }, 3000);
      }
      
    } catch (err) {
      console.error("Detailed error:", err.response?.data || err.message);
      setError(t("errorSubmittingRequest", "There was an error submitting your request. Please try again."));
      setLoading(false);
    }
  };

  // Helper functions to map form values to backend expectations
  const getBudgetValue = (budgetRange) => {
    switch(budgetRange) {
      case "economy": return 35000; // Economy budget
      case "medium": return 75000;  // Medium budget
      case "luxury": return 150000; // Luxury budget
      default: return 75000;
    }
  };

  const toggleFormExpansion = () => {
    setExpanded(!expanded);
  };

  // Calculate minimum date values for the date inputs (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  // For standalone page, we need to add back navigation and page styling
  if (!destinationId && id) {
    return (
      <div className={`custom-tour-page-container ${darkMode ? 'dark-theme' : ''}`}>
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; {t("backToDestination", "Back to Destination")}
        </button>
        
        <div className="custom-tour-form-container page-mode">
          <div className="custom-tour-header">
            <h2>{t("customizeYourTrip", "Customize Your Trip to")} {destinationInfo ? destinationInfo.Name : ""}</h2>
          </div>
          
          <div className="custom-tour-form-content">
            {success && (
              <div className="success-message" ref={successMessageRef}>
                <p>{t("requestSubmittedSuccessfully", "Your custom tour request has been submitted successfully! Our team will contact you soon.")}</p>
                <p>{t("redirectingToDestination", "Redirecting to destination page...")}</p>
              </div>
            )}
            
            {error && (
              <div className="error-message" ref={errorMessageRef}>
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Contact Information Section */}
              <div className="form-section">
                <h4>{t("contactInformation", "Contact Information")}</h4>
                
                <div className="form-group">
                  <label htmlFor="name">{t("fullName", "Full Name")}*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn && userProfile?.name}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t("email", "Email")}*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn && userProfile?.email}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">{t("phone", "Phone Number")}*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Trip Details Section */}
              <div className="form-section">
                <h4>{t("tripDetails", "Trip Details")}</h4>
                
                <div className="form-group">
                  <label htmlFor="startDate">{t("startDate", "Start Date")}*</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    min={tomorrowFormatted}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="endDate">{t("endDate", "End Date")}*</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate || tomorrowFormatted}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="numberOfTravelers">{t("numberOfTravelers", "Number of Travelers")}*</label>
                  <input
                    type="number"
                    id="numberOfTravelers"
                    name="numberOfTravelers"
                    value={formData.numberOfTravelers}
                    onChange={handleInputChange}
                    min="1"
                    max="30"
                    required
                  />
                </div>
              </div>
              
              {/* Preferences Section */}
              <div className="form-section">
                <h4>{t("preferences", "Preferences")}</h4>
                
                <div className="form-group">
                  <label>{t("travelPreferences", "Travel Preferences")} ({t("selectMultiple", "select multiple")})</label>
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="adventure"
                        name="travelPreferences"
                        value="adventure"
                        checked={formData.travelPreferences.includes("adventure")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="adventure">{t("adventure", "Adventure")}</label>
                    </div>
                    
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="cultural"
                        name="travelPreferences"
                        value="cultural"
                        checked={formData.travelPreferences.includes("cultural")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="cultural">{t("cultural", "Cultural")}</label>
                    </div>
                    
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="relaxation"
                        name="travelPreferences"
                        value="relaxation"
                        checked={formData.travelPreferences.includes("relaxation")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="relaxation">{t("relaxation", "Relaxation")}</label>
                    </div>
                    
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="wildlife"
                        name="travelPreferences"
                        value="wildlife"
                        checked={formData.travelPreferences.includes("wildlife")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="wildlife">{t("wildlife", "Wildlife")}</label>
                    </div>
                    
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="historical"
                        name="travelPreferences"
                        value="historical"
                        checked={formData.travelPreferences.includes("historical")}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="historical">{t("historical", "Historical")}</label>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="accommodationPreference">{t("accommodationPreference", "Accommodation Preference")}</label>
                  <select
                    id="accommodationPreference"
                    name="accommodationPreference"
                    value={formData.accommodationPreference}
                    onChange={handleInputChange}
                  >
                    <option value="Budget">{t("budget", "Budget")}</option>
                    <option value="Standard">{t("standard", "Standard")}</option>
                    <option value="Luxury">{t("luxury", "Luxury")}</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="budgetRange">{t("budgetRange", "Budget Range")}</label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                  >
                    <option value="economy">{t("economy", "Economy (PKR 20,000-50,000 per person)")}</option>
                    <option value="medium">{t("medium", "Medium (PKR 50,000-100,000 per person)")}</option>
                    <option value="luxury">{t("luxuryBudget", "Luxury (PKR 100,000+ per person)")}</option>
                  </select>
                </div>
              </div>
              
              {/* Additional Options Section */}
              <div className="form-section">
                <h4>{t("additionalOptions", "Additional Options")}</h4>
                
                <div className="form-group">
                  <label>{t("includeInPackage", "Include in Package")}</label>
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="includeTransportation"
                        name="includeTransportation"
                        checked={formData.includeTransportation}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="includeTransportation">{t("transportation", "Transportation")}</label>
                    </div>
                    
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="includeGuide"
                        name="includeGuide"
                        checked={formData.includeGuide}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="includeGuide">{t("tourGuide", "Tour Guide")}</label>
                    </div>
                    
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="includeMeals"
                        name="includeMeals"
                        checked={formData.includeMeals}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="includeMeals">{t("allMeals", "All Meals")}</label>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="specialRequirements">{t("specialRequirements", "Special Requirements or Requests")}</label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    placeholder={t("specialRequirementsPlaceholder", "Any special requests, dietary restrictions, accessibility needs, or activities you'd like to include...")}
                    rows="4"
                  ></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? t("submitting", "Submitting...") : t("requestCustomTour", "Request Custom Tour")}
                </button>
              </div>
              
              <p className="form-note">
                {t("customTourNote", "* Our team will contact you within 24 hours to discuss your custom tour details and provide a personalized quote.")}
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Original component for embedded use
  return (
    <div className={`custom-tour-form-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className="custom-tour-header" onClick={toggleFormExpansion}>
        <h3>{t("customizeYourTrip", "Customize Your Trip to")} {effectiveDestinationName}</h3>
        <span className={`expansion-icon ${expanded ? 'expanded' : ''}`}>
          {expanded ? '−' : '+'}
        </span>
      </div>
      
      {expanded && (
        <div className="custom-tour-form-content">
          {success && (
            <div className="success-message" ref={successMessageRef}>
              <p>{t("requestSubmittedSuccessfully", "Your custom tour request has been submitted successfully! Our team will contact you soon.")}</p>
            </div>
          )}
          
          {error && (
            <div className="error-message" ref={errorMessageRef}>
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Contact Information Section */}
            <div className="form-section">
              <h4>{t("contactInformation", "Contact Information")}</h4>
              
              <div className="form-group">
                <label htmlFor="name">{t("fullName", "Full Name")}*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoggedIn && userProfile?.name}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t("email", "Email")}*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoggedIn && userProfile?.email}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{t("phone", "Phone Number")}*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            {/* Trip Details Section */}
            <div className="form-section">
              <h4>{t("tripDetails", "Trip Details")}</h4>
              
              <div className="form-group">
                <label htmlFor="startDate">{t("startDate", "Start Date")}*</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  min={tomorrowFormatted}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endDate">{t("endDate", "End Date")}*</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate || tomorrowFormatted}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="numberOfTravelers">{t("numberOfTravelers", "Number of Travelers")}*</label>
                <input
                  type="number"
                  id="numberOfTravelers"
                  name="numberOfTravelers"
                  value={formData.numberOfTravelers}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  required
                />
              </div>
            </div>
            
            {/* Preferences Section */}
            <div className="form-section">
              <h4>{t("preferences", "Preferences")}</h4>
              
              <div className="form-group">
                <label>{t("travelPreferences", "Travel Preferences")} ({t("selectMultiple", "select multiple")})</label>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="adventure"
                      name="travelPreferences"
                      value="adventure"
                      checked={formData.travelPreferences.includes("adventure")}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="adventure">{t("adventure", "Adventure")}</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="cultural"
                      name="travelPreferences"
                      value="cultural"
                      checked={formData.travelPreferences.includes("cultural")}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="cultural">{t("cultural", "Cultural")}</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="relaxation"
                      name="travelPreferences"
                      value="relaxation"
                      checked={formData.travelPreferences.includes("relaxation")}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="relaxation">{t("relaxation", "Relaxation")}</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="wildlife"
                      name="travelPreferences"
                      value="wildlife"
                      checked={formData.travelPreferences.includes("wildlife")}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="wildlife">{t("wildlife", "Wildlife")}</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="historical"
                      name="travelPreferences"
                      value="historical"
                      checked={formData.travelPreferences.includes("historical")}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="historical">{t("historical", "Historical")}</label>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="accommodationPreference">{t("accommodationPreference", "Accommodation Preference")}</label>
                <select
                  id="accommodationPreference"
                  name="accommodationPreference"
                  value={formData.accommodationPreference}
                  onChange={handleInputChange}
                >
                  <option value="Budget">{t("budget", "Budget")}</option>
                  <option value="Standard">{t("standard", "Standard")}</option>
                  <option value="Luxury">{t("luxury", "Luxury")}</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="budgetRange">{t("budgetRange", "Budget Range")}</label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                >
                  <option value="economy">{t("economy", "Economy (PKR 20,000-50,000 per person)")}</option>
                  <option value="medium">{t("medium", "Medium (PKR 50,000-100,000 per person)")}</option>
                  <option value="luxury">{t("luxuryBudget", "Luxury (PKR 100,000+ per person)")}</option>
                </select>
              </div>
            </div>
            
            {/* Additional Options Section */}
            <div className="form-section">
              <h4>{t("additionalOptions", "Additional Options")}</h4>
              
              <div className="form-group">
                <label>{t("includeInPackage", "Include in Package")}</label>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="includeTransportation"
                      name="includeTransportation"
                      checked={formData.includeTransportation}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="includeTransportation">{t("transportation", "Transportation")}</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="includeGuide"
                      name="includeGuide"
                      checked={formData.includeGuide}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="includeGuide">{t("tourGuide", "Tour Guide")}</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="includeMeals"
                      name="includeMeals"
                      checked={formData.includeMeals}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="includeMeals">{t("allMeals", "All Meals")}</label>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="specialRequirements">{t("specialRequirements", "Special Requirements or Requests")}</label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  placeholder={t("specialRequirementsPlaceholder", "Any special requests, dietary restrictions, accessibility needs, or activities you'd like to include...")}
                  rows="4"
                ></textarea>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? t("submitting", "Submitting...") : t("requestCustomTour", "Request Custom Tour")}
              </button>
            </div>
            
            <p className="form-note">
              {t("customTourNote", "* Our team will contact you within 24 hours to discuss your custom tour details and provide a personalized quote.")}
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomTourRequestForm;