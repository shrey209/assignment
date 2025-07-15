const User = require("../Models/users");
const ClaimHistory = require("../Models/claimHistory");
const logger = require("../Middlewares/logger");

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    logger.error("Error creating user:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    return await User.find().sort({ totalPoints: -1 });
  } catch (error) {
    logger.error("Error fetching users:", error);
    throw error;
  }
};

const claimPoints = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({
      userId: user._id,
      points,
    });
    await history.save();

    return {
      points,
      totalPoints: user.totalPoints,
      userId: user._id,
    };
  } catch (error) {
    logger.error("Error claiming points:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  claimPoints,
};
