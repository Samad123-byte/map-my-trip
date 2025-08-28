const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    fr: { type: String, required: true },
    es: { type: String, required: true },
    de: { type: String, required: true },
    zh: { type: String, required: true }
  },
  location: { type: String, required: true },
  description: {
    en: { type: String, required: true },
    fr: { type: String, required: true },
    es: { type: String, required: true },
    de: { type: String, required: true },
    zh: { type: String, required: true }
  },
  price: { 
    type: Map,
    of: Number,
    required: true 
  },
  image: { type: String }, // URL for destination image
  highlights: { 
    en: [String],
    fr: [String],
    es: [String],
    de: [String],
    zh: [String]
   },

   // New fields for reviews
   avgRating: { type: Number, default: 0 },
   reviewCount: { type: Number, default: 0 },

     // Add explicit available field
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Destination', destinationSchema);