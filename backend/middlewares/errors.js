const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // Development mood error
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  // Production mood error
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    // Wrong Mongoose object ID error
    if (err.name == "CastError") {
      const message = `Resource not found. Invalid:${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation error
    if (err.name == "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose duplicate key error
    if (err.code === 11000) {
      const message = `This ${Object.keys(err.keyValue)} already exists`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong jwt error
    if (err.name === "JsonWebTokenError") {
      const message = "Json Web Token is invalid. Please Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    // Handling Expired jwt error
    if (err.name === "TokenExpiredError") {
      const message = "Json Web Token is expired.Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
