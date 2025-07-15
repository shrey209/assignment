const User = require("../Models/users");

const getLeaderboard = async () => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    return users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1,
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLeaderboard,
};
