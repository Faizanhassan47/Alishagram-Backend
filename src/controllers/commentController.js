const Comment = require('../models/Comment');
const Photo = require('../models/Photo');
const Notification = require('../models/Notification');

// @desc    Add a comment to a photo
// @route   POST /api/photos/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const photoId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const comment = await Comment.create({
      photoId,
      userId: req.user._id,
      text
    });

    const photo = await Photo.findById(photoId);
    if (photo && photo.uploadedBy.toString() !== req.user._id.toString()) {
      await Notification.create({
        userId: photo.uploadedBy,
        actorId: req.user._id,
        photoId: photoId,
        type: 'comment'
      });
    }

    const populatedComment = await Comment.findById(comment._id).populate('userId', 'name');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for a photo
// @route   GET /api/photos/:id/comments
// @access  Public
const getCommentsByPhoto = async (req, res) => {
  try {
    const comments = await Comment.find({ photoId: req.params.id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getCommentsByPhoto };
