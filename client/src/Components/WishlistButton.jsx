import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wishlistService } from '../services/api';
import { useTranslation } from 'react-i18next';

const WishlistButton = ({ destinationId }) => {
  const { t } = useTranslation();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the destination is in the wishlist when the component mounts
    checkWishlistStatus();
  }, [destinationId]);

  const checkWishlistStatus = async () => {
    // Only check wishlist if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await wishlistService.checkInWishlist(destinationId);
      setIsInWishlist(response.inWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if not logged in
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    try {
      setLoading(true);
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(destinationId);
      } else {
        await wishlistService.addToWishlist(destinationId);
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={loading}
      className={`flex items-center ${
        isInWishlist ? 'text-red-500 hover:text-red-700' : 'text-gray-500 hover:text-red-500'
      } transition-colors dark:text-gray-300 dark:hover:text-red-400 disabled:opacity-50`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-t-transparent border-gray-500 rounded-full animate-spin mr-1"></span>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill={isInWishlist ? "currentColor" : "none"} 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      )}
          <span className="ml-1">{isInWishlist ? t("saved", "Saved") : t("save", "Save")}</span>
    </button>
  );
};

export default WishlistButton;