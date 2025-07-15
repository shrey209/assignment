const mongoose = require("mongoose");
const logger = require("../Middlewares/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/leaderboard",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    logger.info("MongoDB Connected...");
  } catch (err) {
    logger.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
