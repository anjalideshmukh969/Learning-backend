// const { message } = require("../validator/user.validation");
const razorpayInstance = require("../config/razorpay");
const ProductModel = require("../models/product.model");

const processPaymentController = async (req, res) => {
  try {
    let { amount, currency } = req.body;
    console.log("amount this way->", amount);

    if (!amount || !currency) {
      return res.status(404).json({
        message: "Amount not found",
      });
    }

    let options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: `reciept_${Date.now()}`,
      payment_capture: 1,
    };

    const orders = await razorpayInstance.orders.create(options);
    console.log("yaha order generate hua->", orders);

    if (!orders)
      return res.status(404).json({
        message: "Order not generated",
      });

    return res.status(201).json({
      message: "Order created successfully",
      orders,
    });
  } catch (error) {
    console.log("error in pp", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const verifyPaymentController = async (req, res) => {
  try {
    let {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      product_id,
    } = req.body;

    console.log(
      "datasss...",
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      product_id
    );

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !product_id
    )
      return res.status(404).json({
        message: "Order not found",
      });

    let product = await ProductModel.findById(product_id);

    if (!product)
      return res.status(404).json({
        message: "Product not found for this order",
      });

    product.payment_status = "success";
    await product.save();

    return res.status(200).json({
      message: "Payment successfull",
    });
  } catch (error) {
    console.log("this way verify error->", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  processPaymentController,
  verifyPaymentController,
};