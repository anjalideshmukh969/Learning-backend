const express = require("express");
const {
  processPaymentController,
  verifyPaymentController,
} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/process", processPaymentController);
router.post("/verify", verifyPaymentController);

module.exports = router;