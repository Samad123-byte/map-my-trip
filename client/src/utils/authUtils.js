// src/utils/authUtils.js

export const logout = () => {
  // Clear all authentication related data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  
  // Optional: Clear any other user-specific data
  localStorage.removeItem('wishlist');
  localStorage.removeItem('recentSearches');
  
  console.log('All authentication data cleared');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.isAdmin === true && !!localStorage.getItem('adminToken');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch (error) {
    console.error('Error parsing user data:', error);
    return {};
  }
};