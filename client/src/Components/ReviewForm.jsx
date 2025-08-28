import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { reviewService } from "../services/api";
import "./ReviewForm.css";

const ReviewForm = ({ destinationId, onReviewSubmitted }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'en';
  
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
    dateVisited: new Date().toISOString().split("T")[0]
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Helper function to safely get translated content - matching the one in DestinationDetails
  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object' && contentObj !== null) {
      // Try current language first, then English, then first available key
      return contentObj[currentLang] || 
             contentObj.en || 
             Object.values(contentObj)[0] || 
             fallback;
    }
    
    return contentObj;
  };

  // Helper function to get translated value from t function
  const getTranslation = (key, defaultValue) => {
    const translated = t(key, defaultValue);
    return getTranslatedContent(translated, defaultValue);
  };

  // Show notification function
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when user makes changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = getTranslation("review.titleRequired", "Please provide a title for your review");
    }
    
    if (formData.comment.trim().length < 10) {
      newErrors.comment = getTranslation("review.commentTooShort", "Your review must be at least 10 characters long");
    }
    
    if (!formData.dateVisited) {
      newErrors.dateVisited = getTranslation("review.dateRequired", "Please select the date of your visit");
    } else {
      const visitDate = new Date(formData.dateVisited);
      const today = new Date();
      if (visitDate > today) {
        newErrors.dateVisited = getTranslation("review.futureDateInvalid", "You can't select a future date");
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For file uploads, we'll need FormData
      const uploadData = new FormData();
      uploadData.append("destinationId", destinationId);
      uploadData.append("rating", formData.rating);
      
      // Create multilingual title and comment objects
      const titleObj = { [currentLang]: formData.title };
      const commentObj = { [currentLang]: formData.comment };
      
      // Convert to JSON strings for FormData
      uploadData.append("title", formData.title);
      uploadData.append("comment", formData.comment);
      uploadData.append("language", currentLang);
      uploadData.append("dateVisited", formData.dateVisited);
      
      // Get the token from localStorage (assuming you store it there)
      const token = localStorage.getItem("token");
      
      if (!token) {
        // Redirect to login if not authenticated
        navigate("/login", { state: { from: window.location.pathname } });
        return;
      }
      
      // Use the review service instead of direct axios call
      const response = await reviewService.addReview(uploadData);
      
      setIsSubmitting(false);
      
      // Call the callback to notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted(response.review);
      }
      
      // Show styled notification instead of alert
      showNotification(getTranslation("review.reviewSubmittedAwaitingApproval", "Thank you! Your review has been submitted and is awaiting approval."), "success");
      
      // Reset form after successful submission
      setFormData({
        rating: 5,
        title: "",
        comment: "",
        dateVisited: new Date().toISOString().split("T")[0]
      });
      
    } catch (error) {
      setIsSubmitting(false);
      
      if (error.response?.status === 400 && error.response?.data?.error === "You have already reviewed this destination") {
        setErrors({
          form: getTranslation("review.alreadyReviewed", "You have already reviewed this destination")
        });
      } else if (error.response?.status === 401) {
        // Unauthorized - redirect to login
        navigate("/login", { state: { from: window.location.pathname } });
      } else {
        setErrors({
          form: getTranslation("review.reviewSubmitError", "An error occurred while submitting your review. Please try again later.")
        });
      }
      
      console.error("Error submitting review:", error);
    }
  };

  // Notification Component (inline)
  const Notification = () => {
    if (!notification.show) return null;

    return (
      <div 
        className="notification-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={() => setNotification({ show: false, message: "", type: "" })}
      >
        <div 
          className="notification-content"
          style={{
            backgroundColor: 'var(--card-bg, #ffffff)',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-color, #e5e7eb)',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            position: 'relative',
            animation: 'slideUp 0.3s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              color: notification.type === 'success' ? '#10b981' : '#ef4444'
            }}
          >
            {notification.type === 'success' ? '✓' : '!'}
          </div>
          <h3 
            style={{
              color: 'var(--text-primary, #111827)',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              margin: 0
            }}
          >
            {notification.type === 'success' ? 'Success!' : 'Notice'}
          </h3>
          <p 
            style={{
              color: 'var(--text-secondary, #6b7280)',
              fontSize: '1rem',
              lineHeight: '1.6',
              margin: '1rem 0 2rem 0'
            }}
          >
            {notification.message}
          </p>
          <button
            onClick={() => setNotification({ show: false, message: "", type: "" })}
            style={{
              background: 'linear-gradient(135deg, var(--button-primary, #3b82f6), var(--button-hover, #2563eb))',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            OK
          </button>
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <>
      <div className="review-form-container">
        <div className="review-form-header">
          <h3>{getTranslation("review.writeAReview", "Write a Review")}</h3>
          <p className="review-form-subtitle">Share your experience with other travelers</p>
        </div>
        
        {errors.form && <div className="form-error">{errors.form}</div>}
        
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group rating-group">
            <label htmlFor="rating">{getTranslation("review.rating", "Rating")}:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= formData.rating ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, rating: star })}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">({formData.rating} out of 5)</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="title">{getTranslation("review.reviewTitle", "Review Title")}:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={getTranslation("review.reviewTitlePlaceholder", "Summarize your experience or highlight what stood out")}
              className="form-input"
            />
            {errors.title && <div className="input-error">{errors.title}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">{getTranslation("review.yourReview", "Your Review")}:</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="5"
              placeholder={getTranslation("review.reviewCommentPlaceholder", "Tell others about your experience - what you enjoyed, what could be improved...")}
              className="form-textarea"
            ></textarea>
            {errors.comment && <div className="input-error">{errors.comment}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="dateVisited">{getTranslation("review.dateOfVisit", "Date of Visit")}:</label>
            <input
              type="date"
              id="dateVisited"
              name="dateVisited"
              value={formData.dateVisited}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className="form-input"
            />
            {errors.dateVisited && <div className="input-error">{errors.dateVisited}</div>}
          </div>
          
          <button 
            type="submit" 
            className="submit-review-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="button-spinner"></span>
                {getTranslation("review.submitting", "Submitting...")}
              </>
            ) : (
              getTranslation("review.submitReview", "Submit Review")
            )}
          </button>
        </form>
      </div>
      
      <Notification />
    </>
  );
};

export default ReviewForm;