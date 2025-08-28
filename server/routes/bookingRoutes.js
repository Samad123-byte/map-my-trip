const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require("../models/Booking");
const notificationService = require("../services/notificationService");

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('destination');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

// Get a user's bookings
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Convert userId to ObjectId if it's a valid ObjectId
    let userIdQuery = userId;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      userIdQuery = new mongoose.Types.ObjectId(userId);
    }
    
    const bookings = await Booking.find({ userId: userIdQuery }).populate('destination');
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Error fetching user bookings" });
  }
});

// Get a booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('destination');
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Error fetching booking", details: error.message });
  }
});

// Create a new booking
router.post("/", async (req, res) => {
  try {
    // Set initial status to pending
    const bookingData = {
      ...req.body,
      status: "pending" // Ensure status is set to pending initially
    };
    
    const booking = new Booking(bookingData);
    await booking.save();
    
    // Return the populated booking
    const populatedBooking = await Booking.findById(booking._id).populate('destination');
    
    // Don't send email notification here - moved to after payment confirmation
    
    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Error creating booking", details: error.message });
  }
});

// Update a booking status
// In bookingRoutes.js - Keep the status update route for other scenarios
router.put("/:id/status", async (req, res) => {
  try {
    const { status, transactionId } = req.body;
    console.log(`Updating booking ${req.params.id} status to: ${status}`);
    
    const updateData = { status };
    
    if (transactionId) {
        updateData.transactionId = transactionId;
    }
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id, 
      updateData,
      { new: true }
    ).populate('destination');
    
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    // Send email notification if status is confirmed
    if (status === "confirmed") {
      let userEmail = null;
      
      // Try to get email from booking details
      if (updatedBooking.bookingDetails && updatedBooking.bookingDetails.email) {
        userEmail = updatedBooking.bookingDetails.email;
      }
      
      // Send email notification if email is provided
      if (userEmail) {
        console.log(`Sending confirmation email to: ${userEmail} for confirmed booking`);
        notificationService.sendBookingConfirmationEmail(updatedBooking, userEmail)
          .then(() => console.log('Confirmation email sent successfully'))
          .catch(err => console.error("Email notification error:", err));
      } else {
        console.log('No email provided for booking notification');
      }
    
      // Send SMS notification if phone is provided
      const phoneNumber = updatedBooking.bookingDetails?.phone;
      if (phoneNumber) {
        notificationService.sendBookingConfirmationSMS(phoneNumber, updatedBooking)
          .catch(err => console.error("SMS notification error:", err));
      }
    }
    
    res.json({ 
      message: "Booking status updated", 
      booking: updatedBooking 
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ 
      error: "Error updating booking status",
      details: error.message 
    });
  }
});
// Update a booking
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('destination');
    
    if (!updatedBooking) return res.status(404).json({ error: "Booking not found" });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: "Error updating booking" });
  }
});

// Cancel (delete) a booking
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error canceling booking" });
  }
});

module.exports = router;