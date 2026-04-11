const express = require('express');
const router = express.Router();
const { uploadPhoto, getPhotos, searchPhotos, getPhotoById } = require('../controllers/photoController');
const { addComment, getCommentsByPhoto } = require('../controllers/commentController');
const { addRating, getPhotoRatings } = require('../controllers/ratingController');
const { protect, creatorOnly } = require('../middleware/authMiddleware');
const { upload } = require('../config/storage');

router.get('/', getPhotos);
router.get('/search', searchPhotos);
router.get('/:id', getPhotoById);

// Comments
router.get('/:id/comments', getCommentsByPhoto);
router.post('/:id/comments', protect, addComment);

// Ratings
router.get('/:id/ratings', getPhotoRatings);
router.post('/:id/ratings', protect, addRating);

// Protect route and allow only creators. Handle multipart form data with multer
router.post('/', protect, creatorOnly, upload.single('image'), uploadPhoto);

module.exports = router;
