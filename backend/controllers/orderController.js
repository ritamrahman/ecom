const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create a new Order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get single Order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("No Order found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user Orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  // !orders && next(new ErrorHandler("No Order found"));
  if (!orders) {
    return next(new ErrorHandler("You have no orders yet", 404));
  }

  res.status(200).json({
    success: true,
    totalOrders: orders.length,
    orders,
  });
});

// Get all Orders in DB - Admin => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  // !orders && next(new ErrorHandler("No Order found"));
  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }

  // calculate total amount of total for orders
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalOrders: orders.length,
    totalAmount,
    orders,
  });
});

// Update Order - Admin => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  // !orders && next(new ErrorHandler("No Order found"));
  if (!order) {
    return next(new ErrorHandler("No orders found", 404));
  }

  // check this order deliver or not
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This Order is already delivered", 404));
  }

  //  Update product stock
  order.orderItems.forEach(async (item) => {
    await updateProductStock(item.product, item.quantity);
  });

  // save order
  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({
    success: true,
  });

  // create updateProductStock function
  async function updateProductStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
  }
});

// Delete Order - Admin => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  // !orders && next(new ErrorHandler("No Order found"));
  if (!order) {
    return next(new ErrorHandler("No orders found", 404));
  }

  // check this order deliver or not
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This Order is already delivered You can not delete it", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Order successfully deleted",
  });
});
