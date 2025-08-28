import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create an axios instance for admin API calls
const adminApiClient = axios.create({
  baseURL: `${API_URL}/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
adminApiClient.interceptors.request.use(
  (config) => {
    // Use the admin token specifically for admin routes
    const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
    
    if (!adminToken) {
      console.warn("No admin auth token found");
      window.location.href = '/login';
    } else {
      config.headers['Authorization'] = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error response:", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log("Unauthorized access detected, redirecting to login");
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


// Admin service methods
export const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await adminApiClient.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
  
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await adminApiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
   // getAllDestinations
getAllDestinations: async () => {
  try {
    const response = await adminApiClient.get('/destinations');
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
},

createDestination: async (destinationData) => {
  try {
    // Ensure price is a number
    const processedData = {
      ...destinationData,
      price: Number(destinationData.price) || 0
    };
    const response = await adminApiClient.post('/destinations', processedData);
    return response.data;
  } catch (error) {
    console.error('Error creating destination:', error.response?.data || error.message);
    throw error;
  }
},

//update destination 
updateDestination: async (destinationId, destinationData) => {
  try {
    
    const processedData = {
      ...destinationData,

      price: typeof destinationData.price === 'string' 
        ? Number(destinationData.price) 
        : destinationData.price
    };
    
    console.log('Sending destination update data:', JSON.stringify(processedData, null, 2));
    
    const response = await adminApiClient.put(`/destinations/${destinationId}`, processedData);
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Error updating destination:', error.response?.data || error.message);
    console.error('Status code:', error.response?.status);
    console.error('Headers:', error.response?.headers);
    
    if (error.response?.data?.errors) {
      console.error('Validation errors:', error.response.data.errors);
    }
    
    throw error;
  }
},

deleteDestination: async (destinationId) => {
  try {
    const response = await adminApiClient.delete(`/destinations/${destinationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting destination:', error.response?.data || error.message);
    throw error;
  }
},

toggleDestinationAvailability: async (destinationId, available) => {
  try {
    const response = await adminApiClient.put(`/destinations/${destinationId}/availability`, { available });
    return response.data;
  } catch (error) {
    console.error('Error toggling destination availability:', error.response?.data || error.message);
    throw error;
  }
},
  // Get all bookings
  getAllBookings: async () => {
    try {
      const response = await adminApiClient.get('/bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get single booking
  getBookingById: async (bookingId) => {
    try {
      const response = await adminApiClient.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },
  
  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await adminApiClient.put(`/bookings/${bookingId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },

  // Export bookings data
  exportBookings: async (filters = {}) => {
    try {
      const response = await adminApiClient.get('/bookings/export', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error exporting bookings:', error);
      throw error;
    }
  },

// Get all reviews (with optional filtering)
getAllReviews: async (filters = {}) => {
  try {
    console.log('Making API call with filters:', filters);
    
    // Clean up filters - remove empty or undefined values
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    const response = await adminApiClient.get('/reviews', { 
      params: cleanFilters,
      timeout: 10000 // 10 second timeout
    });
    
    console.log('Reviews API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    
    // Provide more specific error information
    if (error.response) {
      // Server responded with error status
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      console.error('Request error:', error.message);
      throw new Error(error.message || 'Failed to fetch reviews');
    }
  }
},

// Get a specific review by ID
getReviewById: async (reviewId) => {
  try {
    if (!reviewId) {
      throw new Error('Review ID is required');
    }
    
    const response = await adminApiClient.get(`/reviews/${reviewId}`);
    console.log('Single review response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching review:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Review not found');
    }
    
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch review');
  }
},

// Update review status (e.g., approve or reject)
updateReviewStatus: async (reviewId, status, moderationNote = '') => {
  try {
    if (!reviewId) {
      throw new Error('Review ID is required');
    }
    
    if (!status) {
      throw new Error('Status is required');
    }
    
    // Validate status
    const validStatuses = ['pending', 'published', 'rejected'];
    if (!validStatuses.includes(status.toLowerCase())) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    const updateData = { 
      status: status.toLowerCase()
    };
    
    // Add moderation note if provided
    if (moderationNote && moderationNote.trim()) {
      updateData.moderationNote = moderationNote.trim();
    }
    
    console.log('Updating review status:', { reviewId, updateData });
    
    const response = await adminApiClient.put(`/reviews/${reviewId}/status`, updateData);
    console.log('Review status update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating review status:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Review not found');
    }
    
    throw new Error(error.response?.data?.message || error.message || 'Failed to update review status');
  }
},

// Delete a review (admin privilege)
deleteReview: async (reviewId) => {
  try {
    if (!reviewId) {
      throw new Error('Review ID is required');
    }
    
    console.log('Deleting review:', reviewId);
    
    const response = await adminApiClient.delete(`/reviews/${reviewId}`);
    console.log('Review deletion response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Review not found');
    }
    
    throw new Error(error.response?.data?.message || error.message || 'Failed to delete review');
  }
},

// Get reviews by destination
getReviewsByDestination: async (destinationId) => {
  try {
    if (!destinationId) {
      throw new Error('Destination ID is required');
    }
    
    const response = await adminApiClient.get(`/reviews/destination/${destinationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination reviews:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch destination reviews');
  }
},

// Get reviews by user
getReviewsByUser: async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const response = await adminApiClient.get(`/reviews/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch user reviews');
  }
},

// Get review statistics 
getReviewStats: async () => {
  try {
    const response = await adminApiClient.get('/reviews/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching review statistics:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch review statistics');
  }
},

//CustomTours 
getAllCustomTours: async () => {
  try {
    const response = await adminApiClient.get('/custom-tours');
    return response.data;
  } catch (error) {
    console.error('Error fetching custom tours:', error);
    throw error;
  }
},

// Get custom tour by ID
getCustomTourById: async (tourId) => {
  try {
    const response = await adminApiClient.get(`/custom-tours/${tourId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching custom tour details:', error);
    throw error;
  }
},

// Update custom tour status and quote
updateCustomTour: async (tourId, updateData) => {
  try {
    const response = await adminApiClient.put(`/custom-tours/${tourId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating custom tour:', error);
    throw error;
  }
},

// Delete a custom tour request
deleteCustomTour: async (tourId) => {
  try {
    const response = await adminApiClient.delete(`/custom-tours/${tourId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting custom tour:', error);
    throw error;
  }
},

// Get custom tour statistics
getCustomTourStats: async () => {
  try {
    const response = await adminApiClient.get('/custom-tours/stats/summary');
    return response.data;
  } catch (error) {
    console.error('Error fetching custom tour statistics:', error);
    throw error;
  }
},

//contact.form

getAllContacts: async (filters = {}) => {
  try {
    const response = await adminApiClient.get('/contact', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
},

// Update contact status (read/unread/replied)
updateContactStatus: async (contactId, status) => {
  try {
    const response = await adminApiClient.put(`/contact/${contactId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
},

updateContactAdminNotes: async (contactId, adminNotes) => {
  try {
    const response = await adminApiClient.put(`/contact/${contactId}/notes`, { adminNotes });
    return response.data;
  } catch (error) {
    console.error('Error updating contact notes:', error);
    throw error;
  }
},


// Delete a contact submission
deleteContact: async (contactId) => {
  try {
    const response = await adminApiClient.delete(`/contact/${contactId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
},

// Get contact statistics
getContactStats: async () => {
  try {
    const response = await adminApiClient.get('/contact/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching contact statistics:', error);
    throw error;
  }
},


// Chatbot Feedback methods
// ========================
getAllChatbotFeedback: async (filters = {}) => {
  try {
    const response = await adminApiClient.get('/chatbot/feedback', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching chatbot feedback:', error);
    throw error;
  }
},

getChatbotFeedbackStats: async () => {
  try {
    const response = await adminApiClient.get('/chatbot/feedback/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching chatbot feedback statistics:', error);
    throw error;
  }
},

deleteChatbotFeedback: async (feedbackId) => {
  try {
    const response = await adminApiClient.delete(`/chatbot/feedback/${feedbackId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting chatbot feedback:', error);
    throw error;
  }
},

};


export default adminService;