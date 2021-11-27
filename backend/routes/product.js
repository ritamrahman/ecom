const express = require("express");
const router = express.Router();

// import all controller function
const {
  getProducts,
  getAminProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
} = require("../controllers/productControllers");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// define all routes

//===> USER ROUTE
router.route("/products").get(getProducts); // display all products
router.route("/product/:id").get(getSingleProduct); // display single product
router.route("/review").put(isAuthenticatedUser, createProductReview); // create/update new review
router
  .route("/reviews")
  .get(isAuthenticatedUser, getProductReviews) // get product all reviews
  .delete(isAuthenticatedUser, deleteProductReviews); // delete product reviews

//===> ADMIN ROUTE
router.route("/admin/products").get(getAminProducts); // display all products
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct); // create new product
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct) // update single product
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct); //delete single product

module.exports = router;
