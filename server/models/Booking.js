const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'pending' },
  transactionId: { type: String },
  bookingDetails: {
    duration: String,
    travelers: Number,
    accommodation: String,
    email: String,     
    phone: String ,     
    firstName: String,        
    lastName: String,         
    specialRequests: String  
  },
  price: Number,
  currency: { type: String, default: 'PKR' } 
}, {
  timestamps: true  
  });

module.exports = mongoose.model('Booking', bookingSchema);