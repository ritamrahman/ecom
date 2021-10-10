const express = require("express");
const router = express.Router();

// import all controller function
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUserDetails,
  deleteUser,
} = require("../controllers/authController");

// import all middlewares
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// define all routes
// ===> Authenticate
router.route("/register").post(registerUser); // register a user
router.route("/login").post(loginUser); // login a user
router.route("/password/forgot").post(forgotPassword); // forgot password
router.route("/password/reset/:token").put(resetPassword); // reset password
router.route("/logout").get(logout); // login a user

// ===> Admin
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers); // get users data
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails) // get user details
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserDetails) // update user details
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser); // delete user

// ===> User
router.route("/me").get(isAuthenticatedUser, getUserProfile); // user profile
router.route("/password/update").put(isAuthenticatedUser, updatePassword); // update user password
router.route("/me/update").put(isAuthenticatedUser, updateProfile); // update user password

module.exports = router;
