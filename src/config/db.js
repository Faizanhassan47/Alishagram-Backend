const mongoose = require("mongoose");
const dns = require("dns");

// Fallback to Google DNS if local DNS cannot resolve SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("❌ Error: MONGODB_URI is not defined in your .env file.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`📂 Database: ${conn.connection.name}`);

    // Confirm connection with a ping (matching user's snippet logic)
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("🏓 Pinged your deployment. You successfully connected to MongoDB!");

  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(`Error: ${error.message}`);
    // Don't exit process so we can see the full error log
  }
};

module.exports = connectDB;