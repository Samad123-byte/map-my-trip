
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const auth = require('../middleware/auth');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('destinations');
    
    if (!wishlist) {
      // Create new wishlist if none exists
      wishlist = new Wishlist({ user: req.user.id, destinations: [] });
      await wishlist.save();
    }
    
    res.json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add destination to wishlist
router.post('/add/:destinationId', auth, async (req, res) => {
  try {
    const destinationId = req.params.destinationId;
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      // Create new wishlist if none exists
      wishlist = new Wishlist({ user: req.user.id, destinations: [destinationId] });
    } else if (!wishlist.destinations.includes(destinationId)) {
      // Add destination if not already in wishlist
      wishlist.destinations.push(destinationId);
    }
    
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove destination from wishlist
router.delete('/remove/:destinationId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    
    // Filter out the destination to remove
    wishlist.destinations = wishlist.destinations.filter(
      destination => destination.toString() !== req.params.destinationId
    );
    
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check if a destination is in wishlist
router.get('/check/:destinationId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return res.json({ inWishlist: false });
    }
    
    const inWishlist = wishlist.destinations.some(
      destination => destination.toString() === req.params.destinationId
    );
    
    res.json({ inWishlist });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;