// Create routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const Destination = require('../models/Destination');
const Payment = require('../models/Payment');
const authAdmin = require('../middleware/authAdmin');
const Review = require('../models/Review');
const CustomTour = require('../models/customTourModel');
const Contact = require('../models/Contact');
const Feedback = require('../models/Feedback'); 

// Get dashboard stats
router.get('/dashboard', authAdmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const destinationCount = await Destination.countDocuments();
    const revenueData = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
    
    res.json({
      userCount,
      bookingCount,
      pendingBookings,
      confirmedBookings,
      destinationCount,
      revenue: totalRevenue
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Error fetching dashboard stats' });
  }
});

// Get all users (admin only)
router.get('/users', authAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get all bookings (admin only)
router.get('/bookings', authAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('destination')
      .populate('userId', 'name email') 
      .sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Detailed Booking Fetch Error:', error);
    res.status(500).json({ 
      error: 'Error fetching bookings', 
      details: error.message,
      stack: error.stack 
    });
  }
});

// ✅ Update booking status
router.put('/bookings/:bookingId/status', authAdmin, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    console.log(`Updating booking ${bookingId} to status: ${status}`);

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all destinations (admin only)
router.get('/destinations', authAdmin, async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching destinations' });
  }
});
// ✅ Update a destination
router.put('/destinations/:destinationId', authAdmin, async (req, res) => {
  try {
    const { destinationId } = req.params;
    const updateData = req.body;

    console.log(`Updating destination ${destinationId}`);
    console.log('Update data received:', JSON.stringify(updateData, null, 2));

    // Make sure highlights exists and is properly formatted
    if (updateData.highlights) {
      // Ensure each language has an array
      const languages = ['en', 'fr', 'es', 'de', 'zh'];
      languages.forEach(lang => {
        updateData.highlights[lang] = Array.isArray(updateData.highlights[lang]) 
          ? updateData.highlights[lang] 
          : [];
      });
    }

    const updatedDestination = await Destination.findByIdAndUpdate(
      destinationId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json(updatedDestination);
  } catch (error) {
    console.error('Error updating destination:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ✅ Delete a destination
router.delete('/destinations/:destinationId', authAdmin, async (req, res) => {
  try {
    const { destinationId } = req.params;

    console.log(`Deleting destination ${destinationId}`);

    const deletedDestination = await Destination.findByIdAndDelete(destinationId);

    if (!deletedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/destinations', authAdmin, async (req, res) => {
  try {
    const { name, location, price, description, image } = req.body;

    // Ensure price is a number and handle potential undefined cases
    const basePrice = parseFloat(price) || 0;

    const newDestination = new Destination({
      name: {
        en: name.en || name,
        fr: name.fr || name.en || name,
        es: name.es || name.en || name,
        de: name.de || name.en || name,
        zh: name.zh || name.en || name
      },
      location,
      description: {
        en: description.en || description,
        fr: description.fr || description.en || description,
        es: description.es || description.en || description,
        de: description.de || description.en || description,
        zh: description.zh || description.en || description
      },
      price: {
        "3days": basePrice,
        "5days": basePrice * 1.5,
        "7days": basePrice * 2
      },
      image
    });

    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ message: 'Error creating destination', error: error.message });
  }
});

// ✅ Toggle destination availability
router.put('/destinations/:destinationId/availability', authAdmin, async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { available } = req.body;

    console.log(`Updating availability for destination ${destinationId}: ${available}`);

    const updatedDestination = await Destination.findByIdAndUpdate(
      destinationId,
      { available },
      { new: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json(updatedDestination);
  } catch (error) {
    console.error('Error toggling destination availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/custom-tours', authAdmin, async (req, res) => {
  try {
    const customTours = await CustomTour.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(customTours);
  } catch (error) {
    console.error('Error fetching custom tours:', error);
    res.status(500).json({ error: 'Error fetching custom tours' });
  }
});

// Get custom tour by ID
router.get('/custom-tours/:tourId', authAdmin, async (req, res) => {
  try {
    const { tourId } = req.params;
    
    const customTour = await CustomTour.findById(tourId)
      .populate('userId', 'name email');
    
    if (!customTour) {
      return res.status(404).json({ message: 'Custom tour not found' });
    }
    
    res.json(customTour);
  } catch (error) {
    console.error('Error fetching custom tour details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update custom tour status and provide quote
router.put('/custom-tours/:tourId', authAdmin, async (req, res) => {
  try {
    const { tourId } = req.params;
    const { status, adminNotes, quotedPrice } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (quotedPrice !== undefined) updateData.quotedPrice = quotedPrice;
    
    console.log(`Updating custom tour ${tourId} with:`, updateData);
    
    const updatedTour = await CustomTour.findByIdAndUpdate(
      tourId,
      updateData,
      { new: true }
    ).populate('userId', 'name email');
    
    if (!updatedTour) {
      return res.status(404).json({ message: 'Custom tour not found' });
    }
    
    res.json(updatedTour);
  } catch (error) {
    console.error('Error updating custom tour:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a custom tour request
router.delete('/custom-tours/:tourId', authAdmin, async (req, res) => {
  try {
    const { tourId } = req.params;
    
    const deletedTour = await CustomTour.findByIdAndDelete(tourId);
    
    if (!deletedTour) {
      return res.status(404).json({ message: 'Custom tour not found' });
    }
    
    res.json({ message: 'Custom tour deleted successfully' });
  } catch (error) {
    console.error('Error deleting custom tour:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get custom tour statistics
router.get('/custom-tours/stats/summary', authAdmin, async (req, res) => {
  try {
    // Get total count
    const totalRequests = await CustomTour.countDocuments();
    
    // Get status distribution
    const statusCounts = await CustomTour.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Format status counts
    const statusDistribution = {};
    statusCounts.forEach(item => {
      statusDistribution[item._id] = item.count;
    });
    
    // Get monthly trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyTrend = await CustomTour.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          avgBudget: { $avg: '$budget' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    // Format monthly trend
    const formattedTrend = monthlyTrend.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count,
      avgBudget: parseFloat(item.avgBudget.toFixed(2))
    }));
    
    // Get popular destinations
    const popularDestinations = await CustomTour.aggregate([
      { $unwind: '$preferredDestinations' },
      { $group: { 
        _id: '$preferredDestinations', 
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    res.json({
      totalRequests,
      statusDistribution,
      monthlyTrend: formattedTrend,
      popularDestinations
    });
  } catch (error) {
    console.error('Error getting custom tour statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Get all reviews (admin only)
router.get('/reviews', authAdmin, async (req, res) => {
  try {
    // Extract filter parameters from query
    const { rating, destination, user, startDate, endDate, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // Build query object
    let query = {};
    
    // Apply filters if provided
    if (rating) query.rating = parseInt(rating);
    if (destination) query.destination = destination;
    if (user) query.user = user;
    
    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    // Create sort configuration
    const sortConfig = {};
    sortConfig[sortBy] = order === 'desc' ? -1 : 1;
    
    console.log('Review query:', query);
    
    const reviews = await Review.find(query)
      .populate('user', 'name email')
      .populate('destination', 'name location image')
      .sort(sortConfig);
    
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Get reviews for a specific destination (admin only)
router.get('/reviews/destination/:destinationId', authAdmin, async (req, res) => {
  try {
    const { destinationId } = req.params;
    const reviews = await Review.find({ destination: destinationId })
      .populate('user', 'name email')
      .populate('destination', 'name location')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching destination reviews:', error);
    res.status(500).json({ error: 'Error fetching destination reviews' });
  }
});

// Get reviews by a specific user (admin only)
router.get('/reviews/user/:userId', authAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ user: userId })
      .populate('destination', 'name location image')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ error: 'Error fetching user reviews' });
  }
});

// Update review status (e.g., approve, reject, feature)
router.put('/reviews/:reviewId/status', authAdmin, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { status } = req.body;
    
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { status: status },
      { new: true }
    ).populate('user', 'name email')
      .populate('destination', 'name location');
    
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a review (admin only)
router.delete('/reviews/:reviewId', authAdmin, async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Store the destination ID before deleting
    const destinationId = review.destination;
    
    // Delete the review
    await Review.findByIdAndDelete(reviewId);
    
    // Update destination rating and review count
    const allReviews = await Review.find({ destination: destinationId });
    
    if (allReviews.length > 0) {
      const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
      
      await Destination.findByIdAndUpdate(destinationId, {
        avgRating: parseFloat(avgRating.toFixed(1)),
        reviewCount: allReviews.length
      });
    } else {
      // Reset ratings if no reviews left
      await Destination.findByIdAndUpdate(destinationId, {
        avgRating: 0,
        reviewCount: 0
      });
    }
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get review statistics
router.get('/reviews/stats', authAdmin, async (req, res) => {
  try {
    // Get total reviews
    const totalReviews = await Review.countDocuments();
    
    // Get average rating
    const avgRatingData = await Review.aggregate([
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);
    const avgRating = avgRatingData.length > 0 ? parseFloat(avgRatingData[0].avg.toFixed(1)) : 0;
    
    // Get rating distribution
    const ratingDistribution = await Review.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    // Format rating distribution as an object
    const ratingCounts = {};
    for (let i = 1; i <= 5; i++) {
      const found = ratingDistribution.find(item => item._id === i);
      ratingCounts[i] = found ? found.count : 0;
    }
    
    // Get recent review trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyTrend = await Review.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    // Format monthly trend
    const formattedTrend = monthlyTrend.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count,
      avgRating: parseFloat(item.avgRating.toFixed(1))
    }));
    
    // Get top rated destinations
    const topDestinations = await Review.aggregate([
      { $group: { 
        _id: '$destination', 
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      } },
      { $match: { count: { $gte: 3 } } }, // Minimum 3 reviews
      { $sort: { avgRating: -1 } },
      { $limit: 5 }
    ]);
    
    // Populate destination data
    const populatedTopDestinations = [];
    for (const dest of topDestinations) {
      const destination = await Destination.findById(dest._id, 'name location image');
      if (destination) {
        populatedTopDestinations.push({
          destination: {
            _id: destination._id,
            name: destination.name,
            location: destination.location,
            image: destination.image
          },
          avgRating: parseFloat(dest.avgRating.toFixed(1)),
          reviewCount: dest.count
        });
      }
    }
    
    res.json({
      totalReviews,
      avgRating,
      ratingDistribution: ratingCounts,
      monthlyTrend: formattedTrend,
      topDestinations: populatedTopDestinations
    });
  } catch (error) {
    console.error('Error getting review statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all contact submissions (admin only)
router.get('/contact', authAdmin, async (req, res) => {
  try {
    const { status, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // Build query
    let query = {};
    if (status) query.status = status;
    
    // Create sort configuration
    const sortConfig = {};
    sortConfig[sortBy] = order === 'desc' ? -1 : 1;
    
    const contacts = await Contact.find(query)
      .sort(sortConfig);
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Error fetching contact submissions' });
  }
});

// Update contact admin notes
router.put('/contact/:contactId/notes', authAdmin, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { adminNotes } = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { adminNotes },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark contact as read/unread
router.put('/contact/:contactId/status', authAdmin, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status } = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { status },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a contact submission
router.delete('/contact/:contactId', authAdmin, async (req, res) => {
  try {
    const { contactId } = req.params;
    
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get contact statistics
router.get('/contact/stats', authAdmin, async (req, res) => {
  try {
    // Get total contacts
    const totalContacts = await Contact.countDocuments();
    
    // Get unread contacts count
    const unreadCount = await Contact.countDocuments({ status: 'unread' });
    
    // Get contact trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyTrend = await Contact.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    // Format monthly trend
    const formattedTrend = monthlyTrend.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count
    }));
    
    res.json({
      totalContacts,
      unreadCount,
      monthlyTrend: formattedTrend
    });
  } catch (error) {
    console.error('Error getting contact statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// AI Chatbot Feedback Routes
// ===========================

// Get all chatbot feedback
router.get('/chatbot/feedback', authAdmin, async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'desc', startDate, endDate, helpful } = req.query;
    
    // Build query object
    let query = {};
    
    // Apply filters if provided
    if (helpful !== undefined) {
      query.helpful = helpful === 'true';
    }
    
    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    // Create sort configuration
    const sortConfig = {};
    sortConfig[sortBy] = order === 'desc' ? -1 : 1;
    
    const feedbackList = await Feedback.find(query)
      .populate('userId', 'name email')
      .sort(sortConfig);
    
    res.json(feedbackList);
  } catch (error) {
    console.error('Error fetching chatbot feedback:', error);
    res.status(500).json({ error: 'Error fetching chatbot feedback' });
  }
});

// Get chatbot feedback statistics
router.get('/chatbot/feedback/stats', authAdmin, async (req, res) => {
  try {
    // Get total feedback count
    const totalFeedback = await Feedback.countDocuments();
    
    // Get helpful/unhelpful counts
    const helpfulCount = await Feedback.countDocuments({ helpful: true });
    const unhelpfulCount = await Feedback.countDocuments({ helpful: false });
    
    // Calculate satisfaction rate
    const satisfactionRate = totalFeedback > 0 
      ? parseFloat(((helpfulCount / totalFeedback) * 100).toFixed(1)) 
      : 0;
    
    // Get feedback trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyTrend = await Feedback.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          helpful: { 
            $sum: { $cond: [{ $eq: ['$helpful', true] }, 1, 0] }
          }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    // Format monthly trend with satisfaction rate
    const formattedTrend = monthlyTrend.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count,
      satisfaction: item.count > 0 
        ? parseFloat(((item.helpful / item.count) * 100).toFixed(1)) 
        : 0
    }));
    
    res.json({
      totalFeedback,
      helpfulCount,
      unhelpfulCount,
      satisfactionRate,
      monthlyTrend: formattedTrend
    });
  } catch (error) {
    console.error('Error getting chatbot feedback statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete chatbot feedback
router.delete('/chatbot/feedback/:feedbackId', authAdmin, async (req, res) => {
  try {
    const { feedbackId } = req.params;
    
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
    
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting chatbot feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;