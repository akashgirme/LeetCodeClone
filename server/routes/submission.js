const express = require("express");

const router = express.Router();

const submissionController = require("../controllers/submission");

const { restrictToLoggedInUserOnly } = require("../middleware/auth");

router.post(
  "/add/:id",
  restrictToLoggedInUserOnly,
  submissionController.handleCodeSubmission,
);

router.get(
  "/get/:id",
  restrictToLoggedInUserOnly,
  submissionController.handleGetSubmission,
);

router.get('/user', restrictToLoggedInUserOnly, submissionController.handleGetSubmissionsForUsers)

module.exports = router;
