// models/KnowledgeBase.js
const mongoose = require('mongoose');

const knowledgeBaseSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['bookings', 'destinations', 'payments', 'account', 'general', 'activities', 'custom-tours','special-offers' ],
    default: 'general'
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('KnowledgeBase', knowledgeBaseSchema);