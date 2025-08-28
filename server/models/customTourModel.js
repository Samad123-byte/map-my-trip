const mongoose = require('mongoose');

const customTourSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  preferredDestinations: [{
    type: String,
    required: true
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  numberOfTravelers: {
    type: Number,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  accommodationPreference: {
    type: String,
    enum: ['Budget', 'Standard', 'Luxury'],
    required: true
  },
  activities: [{
    type: String
  }],
  specialRequirements: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewing', 'Quoted', 'Confirmed', 'Rejected'],
    default: 'Confirmed'
  },
  adminNotes: {
    type: String
  },
  quotedPrice: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CustomTour', customTourSchema);