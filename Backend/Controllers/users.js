const userService = require("../Services/users");
const leaderboardService = require("../Services/leaderboard");
const { validationResult } = require("express-validator");
const logger = require("../Middlewares/logger");
const mongoose = require("mongoose");

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const leaderboard = await leaderboardService.getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
};

exports.claimPoints = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const result = await userService.claimPoints(req.params.userId);
    res.json(result);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    logger.error("Claim points error:", error);
    next(error);
  }
};
