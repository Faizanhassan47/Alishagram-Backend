require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

const startServer = async () => {
  try {
    await connectDB();
    console.log('Database connection initialized');

    const server = app.listen(PORT, HOST, () => {
      console.log(`Server running on ${HOST}:${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Closing server...`);
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
