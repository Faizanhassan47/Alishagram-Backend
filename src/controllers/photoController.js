const Photo = require('../models/Photo');

// @desc    Get single photo by ID
// @route   GET /api/photos/:id
// @access  Public
const getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id).populate('uploadedBy', 'name');
    if (photo) {
      res.json(photo);
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload a new photo
// @route   POST /api/photos
// @access  Private / Creator only
const uploadPhoto = async (req, res) => {
  try {
    const { title, caption, country, city, location, tags } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const t = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const photo = await Photo.create({
      title,
      caption,
      country,
      city,
      location,
      tags: t,
      imageUrl: req.file.path, // Cloudinary URL
      uploadedBy: req.user._id,
    });

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all photos
// @route   GET /api/photos
// @access  Public
const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().populate('uploadedBy', 'name').sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search photos
// @route   GET /api/photos/search
// @access  Public
const searchPhotos = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    
    // Using simple regex for matching on multiple fields
    const searchQuery = new RegExp(q, 'i');
    const photos = await Photo.find({
      $or: [
        { title: searchQuery },
        { city: searchQuery },
        { country: searchQuery },
        { tags: searchQuery }
      ]
    }).populate('uploadedBy', 'name').sort({ createdAt: -1 });

    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadPhoto,
  getPhotos,
  searchPhotos,
  getPhotoById
};
