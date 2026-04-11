const Rating = require('../models/Rating');
const Photo = require('../models/Photo');
const Notification = require('../models/Notification');

// @desc    Add or update a rating for a photo
// @route   POST /api/photos/:id/ratings
// @access  Private
const addRating = async (req, res) => {
  try {
    const photoId = req.params.id;
    const { value } = req.body;

    if (!value || value < 1 || value > 5) {
      return res.status(400).json({ message: 'Valid rating value (1-5) is required' });
    }

    // Upsert rating (if exists, update; otherwise, create)
    const isNew = await Rating.findOne({ photoId, userId: req.user._id }) === null;
    const rating = await Rating.findOneAndUpdate(
      { photoId, userId: req.user._id },
      { value },
      { new: true, upsert: true }
    );

    if (isNew) {
      const photo = await Photo.findById(photoId);
      if (photo && photo.uploadedBy.toString() !== req.user._id.toString()) {
        await Notification.create({
          userId: photo.uploadedBy,
          actorId: req.user._id,
          photoId: photoId,
          type: 'rating'
        });
      }
    }

    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get average rating and current user's rating for a photo
// @route   GET /api/photos/:id/ratings
// @access  Public
const getPhotoRatings = async (req, res) => {
  try {
    const photoId = req.params.id;
    const ratings = await Rating.find({ photoId });

    if (ratings.length === 0) {
      return res.json({ average: 0, count: 0 });
    }

    const total = ratings.reduce((acc, curr) => acc + curr.value, 0);
    const average = total / ratings.length;

    res.json({ average: average.toFixed(1), count: ratings.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addRating, getPhotoRatings };
