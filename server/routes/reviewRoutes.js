// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Destination = require('../models/Destination');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('destination', 'name location image');
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Get reviews for a specific destination
router.get('/destination/:destinationId', async (req, res) => {
  try {
    const { destinationId } = req.params;
    const reviews = await Review.find({ destination: destinationId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching destination reviews' });
  }
});

// Get reviews by a user
router.get('/user', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.userId })
      .populate('destination', 'name location image')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user reviews' });
  }
});

// Add a new review
router.post('/', auth, async (req, res) => {
  try {
    const { destinationId, rating, title, comment, photos, dateVisited } = req.body;
    
    // Check if user already reviewed this destination
    const existingReview = await Review.findOne({
      user: req.userId,
      destination: destinationId
    });
    
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this destination' });
    }
    
    // Create and save the review
    const newReview = new Review({
      user: req.userId,
      destination: destinationId,
      rating,
      title,
      comment,
      photos: photos || [],
      dateVisited: dateVisited || Date.now()
    });
    
    await newReview.save();
    
    // Update destination average rating
    const allReviews = await Review.find({ destination: destinationId });
    const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
    
    await Destination.findByIdAndUpdate(destinationId, {
      avgRating: parseFloat(avgRating.toFixed(1)),
      reviewCount: allReviews.length
    });
    
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ error: 'Error adding review' });
  }
});

// Update a review
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, comment, photos, dateVisited } = req.body;
    
    // Find the review and check if user owns it
    const review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    // Check if the user owns the review
    if (review.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    // Update the review
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, title, comment, photos, dateVisited },
      { new: true }
    );
    
    // Update destination average rating
    const destinationId = review.destination;
    const allReviews = await Review.find({ destination: destinationId });
    const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
    
    await Destination.findByIdAndUpdate(destinationId, {
      avgRating: parseFloat(avgRating.toFixed(1))
    });
    
    res.json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    res.status(500).json({ error: 'Error updating review' });
  }
});

// Delete a review
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the review and check if user owns it
    const review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    // Check if the user owns the review or is an admin
    const user = await User.findById(req.userId);
    if (review.user.toString() !== req.userId && !user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    // Store the destination ID before deleting the review
    const destinationId = review.destination;
    
    // Delete the review
    await Review.findByIdAndDelete(id);
    
    // Update destination average rating
    const allReviews = await Review.find({ destination: destinationId });
    
    if (allReviews.length > 0) {
      const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
      
      await Destination.findByIdAndUpdate(destinationId, {
        avgRating: parseFloat(avgRating.toFixed(1)),
        reviewCount: allReviews.length
      });
    } else {
      // If no reviews left, reset the rating
      await Destination.findByIdAndUpdate(destinationId, {
        avgRating: 0,
        reviewCount: 0
      });
    }
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting review' });
  }
});

module.exports = router;