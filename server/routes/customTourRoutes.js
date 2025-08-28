// routes/customTourRoutes.js - Updated version with email integration

const express = require('express');
const router = express.Router();
const CustomTour = require('../models/customTourModel');
const auth = require('../middleware/auth');
const { sendCustomTourConfirmation, sendAdminNotification } = require('../services/emailService');

// Submit a custom tour request
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      preferredDestinations,
      startDate,
      endDate,
      numberOfTravelers,
      budget,
      accommodationPreference,
      activities,
      specialRequirements
    } = req.body;

    // Create new custom tour request
    const newCustomTour = new CustomTour({
      userId: req.user.id,
      name,
      email,
      phone,
      preferredDestinations,
      startDate,
      endDate,
      numberOfTravelers,
      budget,
      accommodationPreference,
      activities,
      specialRequirements,
      status: 'Confirmed'
    });

    const savedTour = await newCustomTour.save();

    // Send confirmation email to customer
    try {
      const emailResult = await sendCustomTourConfirmation(savedTour);
      if (emailResult.success) {
        console.log('✅ Confirmation email sent to customer');
      } else {
        console.error('❌ Failed to send confirmation email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Email service error:', emailError);
      // Don't fail the booking if email fails
    }

    // Send notification to admin
    try {
      const adminEmailResult = await sendAdminNotification(savedTour);
      if (adminEmailResult.success) {
        console.log('✅ Admin notification email sent');
      } else {
        console.error('❌ Failed to send admin notification:', adminEmailResult.error);
      }
    } catch (emailError) {
      console.error('Admin email service error:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json({
      ...savedTour.toObject(),
      message: 'Tour request confirmed successfully! Check your email for confirmation details.'
    });
  } catch (error) {
    console.error('Error creating custom tour request:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's custom tour requests
router.get('/my-requests', auth, async (req, res) => {
  try {
    const customTours = await CustomTour.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(customTours);
  } catch (error) {
    console.error('Error fetching user custom tours:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific tour request details
router.get('/:tourId', auth, async (req, res) => {
  try {
    const { tourId } = req.params;
    
    const customTour = await CustomTour.findOne({ 
      _id: tourId,
      userId: req.user.id
    });
    
    if (!customTour) {
      return res.status(404).json({ message: 'Custom tour not found' });
    }
    
    res.json(customTour);
  } catch (error) {
    console.error('Error fetching custom tour details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a custom tour request (only if it's still pending)
router.put('/:tourId', auth, async (req, res) => {
  try {
    const { tourId } = req.params;
    const updateData = req.body;
    
    // Find the tour
    const tour = await CustomTour.findOne({
      _id: tourId,
      userId: req.user.id
    });
    
    if (!tour) {
      return res.status(404).json({ message: 'Custom tour not found' });
    }
    
    // Only allow updates if the tour is still pending
    if (tour.status !== 'Pending') {
      return res.status(400).json({ 
        message: 'Cannot modify this request as it is already being processed' 
      });
    }
    
    // Prevent updating of certain fields
    delete updateData.status;
    delete updateData.adminNotes;
    delete updateData.quotedPrice;
    delete updateData.userId;
    
    const updatedTour = await CustomTour.findByIdAndUpdate(
      tourId,
      updateData,
      { new: true }
    );
    
    res.json(updatedTour);
  } catch (error) {
    console.error('Error updating custom tour:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel a custom tour request
router.delete('/:tourId', auth, async (req, res) => {
  try {
    const { tourId } = req.params;
    
    // Find the tour and ensure it belongs to the user
    const tour = await CustomTour.findOne({
      _id: tourId,
      userId: req.user.id
    });
    
    if (!tour) {
      return res.status(404).json({ message: 'Custom tour not found' });
    }
    
    // Only allow cancellation if not already confirmed
    if (tour.status === 'Confirmed') {
      return res.status(400).json({ 
        message: 'Cannot cancel a confirmed tour. Please contact support.'
      });
    }
    
    await CustomTour.findByIdAndDelete(tourId);
    
    res.json({ message: 'Custom tour request cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling custom tour:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;