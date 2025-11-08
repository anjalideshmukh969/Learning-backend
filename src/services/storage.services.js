const ImageKit = require("imagekit");
// Initialize ImageKit instance with your credentials
const storageInstance = new ImageKit({
    publicKey: process.env.imagekit_public_key,
    privateKey: process.env.imagekit_private_key,
    urlEndpoint: process.env.imagekit_url_endpoint,
});
// Function to upload files to ImageKit to be used in controllers
const sendFiles = async (file, fileName) => {
    return await storageInstance.upload({
        file,
        fileName,
        folder: "HM",
    })
}

module.exports = sendFiles;

// ImageKit is a cloud-based image & video CDN.It lets you:
// Upload images from your backend or frontend
// Automatically compress, resize, crop, or transform them
// Serve them super-fast using a global CDN