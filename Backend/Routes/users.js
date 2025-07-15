const express = require("express");
const router = express.Router();
const userController = require("../Controllers/users");
const validate = require("../Validator/user");

router.get("/", userController.getUsers);
router.post("/", validate.createUser, userController.createUser);
router.post("/:userId/claim", userController.claimPoints);

module.exports = router;
