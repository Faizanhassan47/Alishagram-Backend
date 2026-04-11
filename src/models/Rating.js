const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  photoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Photo',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  }
}, { timestamps: true });

// Ensure a user can only rate a photo once
ratingSchema.index({ photoId: 1, userId: 1 }, { unique: true });

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
