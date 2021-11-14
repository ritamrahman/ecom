const express = require("express");
const router = express.Router();

// import all controller function
const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");

// import all middlewares
const { isAuthenticatedUser } = require("../middlewares/auth");

// define all routes

// ===> Admin

// ===> User
router.route("/payment/process").post(isAuthenticatedUser, processPayment); // create new order
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi); // create new order

module.exports = router;
