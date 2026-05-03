const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Routes will be added here
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/notifications', notificationRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

module.exports = app;
