const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // The user receiving the notification
    ref: 'User',
    required: true,
  },
  actorId: {
    type: mongoose.Schema.Types.ObjectId, // The user who did the action
    ref: 'User',
  },
  photoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
  },
  type: {
    type: String,
    enum: ['comment', 'rating'],
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
