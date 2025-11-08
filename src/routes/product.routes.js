const express = require('express'); 
const upload = require("../config/multer")
const { createProductController } = require('../controllers/product.controller');

const router = express.Router();
router.post("/create", upload.array("images",5), createProductController);

module.exports = router;    