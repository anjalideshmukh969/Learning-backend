const multer = require('multer');

// Set up multer storage (in memory)
const storage = multer.memoryStorage();
 
const upload = multer({storage });

module.exports = upload;

//Multer is a middleware for Express.js that handles file uploads (mostly images) sent through form-data.When someone uploads a file from the frontend (e.g., through an <input type="file">), Multer parses it and stores it either:
// Locally (in your project folder),In memory,Or passes it to cloud services (like ImageKit, Cloudinary, etc.)