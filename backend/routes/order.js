const express = require("express");
const router = express.Router();

// import all controller function
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// import all middlewares
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// define all routes

// ===> Admin
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders); // create new order
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder) // update order
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder); // delete order

// ===> User
router.route("/order/new").post(isAuthenticatedUser, newOrder); // create new order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder); // get single order
router.route("/orders/me").get(isAuthenticatedUser, myOrders); // my orders

module.exports = router;
