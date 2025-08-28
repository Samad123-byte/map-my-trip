const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

// Mock Payment Route
// In paymentRoutes.js - Make sure confirmation email is triggered correctly
router.post("/pay", async (req, res) => {
    let { amount, customerEmail, paymentMethod, bookingId, userId } = req.body;

    // Convert userId to ObjectId only if it's a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(userId)) {
        userId = new mongoose.Types.ObjectId(userId);
    }

    try {
        const transactionId = `TXN${Date.now()}`;
        const payment = new Payment({
            userId,
            bookingId: new mongoose.Types.ObjectId(bookingId),
            amount,
            status: 'completed',
            transactionId
        });

        await payment.save();
        
        console.log(`Payment successful for booking ${bookingId}, updating status to confirmed`);
        
        // Update booking status to confirmed
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { 
            status: "confirmed",
            transactionId: transactionId
        }, { new: true }).populate('destination');

        let emailToUse = null;
        
        if (updatedBooking && updatedBooking.bookingDetails && updatedBooking.bookingDetails.email) {
            emailToUse = updatedBooking.bookingDetails.email;
        } else if (customerEmail) {
            emailToUse = customerEmail;
            
            // Also update the booking with this email if it was missing
            if (updatedBooking) {
                await Booking.findByIdAndUpdate(bookingId, {
                    "bookingDetails.email": customerEmail
                });
            }
        }
        
        if (emailToUse) {
            console.log(`Sending confirmation email to: ${emailToUse}`);
            
            try {
                const notificationService = require("../services/notificationService");
                await notificationService.sendBookingConfirmationEmail(updatedBooking, emailToUse);
                console.log('Confirmation email sent successfully');
            } catch (emailError) {
                console.error("Failed to send email:", emailError);
            }
        } else {
            console.log('No email found for booking notification');
        }

        res.status(200).json({
            success: true,
            message: "Payment successful",
            transactionId
        });
    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ success: false, error: "Payment processing failed" });
    }
});
module.exports = router;