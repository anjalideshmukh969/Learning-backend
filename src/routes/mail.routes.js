const express = require('express');

const mailController = require("../controllers/mail.controller");

const router = express.Router();
router.post('/sendmail', mailController);

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);


module.exports = router;