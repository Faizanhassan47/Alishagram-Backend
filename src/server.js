require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ Database connected');

    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

// 🔥 THIS LINE WAS MISSING
startServer();