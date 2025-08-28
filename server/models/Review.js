// Updated models/Review.js to support multilingual content
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: mongoose.Schema.Types.Mixed, // Changed to Mixed to support language object
    required: true,
    validate: {
      validator: function(v) {
        // Accept either a string or an object with language keys
        return typeof v === 'string' || 
               (typeof v === 'object' && Object.keys(v).length > 0);
      },
      message: 'Title must be either a string or a language object'
    }
  },
  comment: {
    type: mongoose.Schema.Types.Mixed, // Changed to Mixed to support language object
    required: true,
    validate: {
      validator: function(v) {
        // Accept either a string or an object with language keys
        return typeof v === 'string' || 
               (typeof v === 'object' && Object.keys(v).length > 0);
      },
      message: 'Comment must be either a string or a language object'
    }
  },
  dateVisited: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'published', 'rejected'],
    default: 'published'
  },
  moderationNote: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);