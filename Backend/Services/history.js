const ClaimHistory = require("../Models/claimHistory");

const getClaimHistory = async (userId, limit = 10) => {
  try {
    const query = userId ? { userId } : {};
    return await ClaimHistory.find(query)
      .sort({ claimedAt: -1 })
      .limit(limit)
      .populate("userId", "name");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getClaimHistory,
};
