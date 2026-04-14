const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinary() {
  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary Ping Result:", result);
    
    // Try to get account details
    const account = await cloudinary.api.usage();
    console.log("Cloudinary Account valid. Usage:", account.plan);
  } catch (error) {
    console.error("Cloudinary Authentication Failed:");
    console.error(JSON.stringify(error, null, 2));
  }
}

testCloudinary();
