const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");

const { restrictToLoggedInUserOnly } = require("../middleware/auth");

router.get("/", restrictToLoggedInUserOnly, userController.handleGetUser);

router.post("/register", userController.handleRegisterUser);

router.post("/login", userController.handleLoginUser);

module.exports = router;
