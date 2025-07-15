const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  res.status(500).json({
    message: "Something went wrong on the server",
  });
};

module.exports = errorHandler;
