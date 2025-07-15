const express = require("express");
const router = express.Router();
const historyController = require("../Controllers/history");

router.get("/", historyController.getClaimHistory);

module.exports = router;
