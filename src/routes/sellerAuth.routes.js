const express = require('express');
const {route} = require("./product.routes")
const { registerSellerController, SellerLoginController, getSellerProfileController } = require('../controllers/sellerAuth.controllers');
const { UserSchemaValidator } = require('../validator/user.validation');

// Create router instance to define routes
const router = express.Router();

router.post('/register', registerSellerController);
router.post('/login', SellerLoginController);
router.get('/profile', getSellerProfileController);


module.exports = router;