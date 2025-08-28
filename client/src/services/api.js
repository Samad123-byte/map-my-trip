// src/services/api.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // For admin endpoints, use adminToken if available
    if (config.url.includes('/admin/')) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        config.headers['Authorization'] = `Bearer ${adminToken}`;
        return config;
      }
    }
    
    // For regular endpoints, use regular token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User services
export const userService = {
  register: async (userData) => {
    try {
      const response = await apiClient.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/users/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
};


// Password Reset services
export const passwordResetService = {
  requestReset: async (email) => {
    try {
      const response = await apiClient.post('/password-reset/request-reset', { email });
      return response.data;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  },
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post('/password-reset/reset-password', { 
        token, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },
  verifyToken: async (token) => {
    try {
      const response = await apiClient.get(`/password-reset/verify-token/${token}`);
      return response.data;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;
    }
  }
};

// Destination services
export const destinationService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/destinations');
      return response.data;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destination:', error);
      throw error;
    }
  },
};

// Booking services
export const bookingService = {
  createBooking: async (bookingData) => {
    try {
      const response = await apiClient.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },
  getUserBookings: async (userId) => {
    try {
      const response = await apiClient.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }, 
  cancelBooking: async (bookingId) => {
    try {
      const response = await apiClient.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  },
  updateBookingStatus: async (bookingId, status, transactionId = null) => {
    try {
        const payload = { status };
        if (transactionId) {
            payload.transactionId = transactionId;
        }
        
        const response = await apiClient.put(
            `/bookings/${bookingId}/status`, 
            payload
        );
        return response.data;
    } catch (error) {
        console.error('Error updating booking status:', error);
        throw error;
    }
},
  getBookingById: async (bookingId) => {
    try {
      const response = await apiClient.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  }
};

// Payment services (mock implementation for now)
export const paymentService = {
  processPayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/payments/pay', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  },
};


// Chatbot services
export const chatbotService = {
  sendMessage: async (message, userId, language = 'en') => {
    try {
      const response = await apiClient.post('/chatbot/query', {
        message,
        userId,
        language // Pass the current language to the backend
      });
      return response.data;
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      throw error;
    }
  },
  sendFeedback: async (queryId, userId, helpful, comments = '') => {
    try {
      const response = await apiClient.post('/chatbot/feedback', {
        queryId,
        userId,
        helpful,
        comments
      });
      return response.data;
    } catch (error) {
      console.error('Error sending feedback:', error);
      throw error;
    }
  }
};

//CustomTourService
export const customTourService = {
  submitRequest: async (tourData) => {
    try {
      const response = await apiClient.post('/custom-tours', tourData);
      return response.data;
    } catch (error) {
      console.error('Error submitting custom tour request:', error);
      throw error;
    }
  },
  getUserRequests: async () => {
    try {
      const response = await apiClient.get('/custom-tours/my-requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching user custom tour requests:', error);
      throw error;
    }
  },
  getRequestById: async (tourId) => {
    try {
      const response = await apiClient.get(`/custom-tours/${tourId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching custom tour details:', error);
      throw error;
    }
  },
  updateRequest: async (tourId, updateData) => {
    try {
      const response = await apiClient.put(`/custom-tours/${tourId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating custom tour request:', error);
      throw error;
    }
  },
  cancelRequest: async (tourId) => {
    try {
      const response = await apiClient.delete(`/custom-tours/${tourId}`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling custom tour request:', error);
      throw error;
    }
  }
};

// Wishlist services
export const wishlistService = {
  getWishlist: async () => {
    try {
      const response = await apiClient.get('/wishlist');
      return response.data;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },
  addToWishlist: async (destinationId) => {
    try {
      const response = await apiClient.post(`/wishlist/add/${destinationId}`);
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },
  removeFromWishlist: async (destinationId) => {
    try {
      const response = await apiClient.delete(`/wishlist/remove/${destinationId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },
  checkInWishlist: async (destinationId) => {
    try {
      const response = await apiClient.get(`/wishlist/check/${destinationId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      throw error;
    }
  }
};

// Knowledge base services
export const knowledgeBaseService = {
  search: async (query) => {
    try {
      const response = await apiClient.get(`/knowledge-base/search/${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching knowledge base:', error);
      throw error;
    }
  },
  getArticle: async (id) => {
    try {
      const response = await apiClient.get(`/knowledge-base/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching knowledge base article:', error);
      throw error;
    }
  },
  getAllArticles: async () => {
    try {
      const response = await apiClient.get('/knowledge-base');
      return response.data;
    } catch (error) {
      console.error('Error fetching knowledge base articles:', error);
      throw error;
    }
  }
};


// Review services
export const reviewService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/reviews');
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },
  getByDestination: async (destinationId) => {
    try {
      const response = await apiClient.get(`/reviews/destination/${destinationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destination reviews:', error);
      throw error;
    }
  },
  getUserReviews: async () => {
    try {
      const response = await apiClient.get('/reviews/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }
  },
  addReview: async (reviewData) => {
    try {
      const response = await apiClient.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await apiClient.put(`/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },
  deleteReview: async (reviewId) => {
    try {
      const response = await apiClient.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }
};

export const contactService = {
  submitForm: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
};

export default apiClient;