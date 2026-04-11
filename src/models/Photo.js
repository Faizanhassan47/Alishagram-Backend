const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}, { timestamps: true });

// Add text indexing for search indexing
photoSchema.index({ title: 'text', city: 'text', country: 'text', tags: 'text' });

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
