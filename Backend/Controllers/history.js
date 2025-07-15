const historyService = require("../Services/history");

exports.getClaimHistory = async (req, res, next) => {
  try {
    const history = await historyService.getClaimHistory(
      req.query.userId,
      req.query.limit
    );
    res.json(history);
  } catch (error) {
    next(error);
  }
};
