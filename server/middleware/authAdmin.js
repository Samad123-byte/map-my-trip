const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authAdmin = async (req, res, next) => {
  try {
    console.log("Auth header:", req.header('Authorization')); // Log full header
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from header
    
    if (!token) {
      console.log("No token found in request");
      return res.status(401).json({ error: 'No authentication token, access denied' });
    }

    console.log("Token extracted:", token.substring(0, 10) + "..."); // Show first few chars
    
    // Decode token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", verified); // ✅ Debugging log

    req.user = await User.findById(verified.userId);
    console.log("User from DB:", req.user ? {
      id: req.user._id,
      email: req.user.email,
      isAdmin: req.user.isAdmin
    } : "User not found"); // ✅ Debugging log with sanitized output

    if (!req.user || !req.user.isAdmin) {
      console.log("Access denied: Admin privileges required.");
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ error: 'Server error in admin authentication' });
  }
};

module.exports = authAdmin;