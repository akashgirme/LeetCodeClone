const express = require("express");

const router = express.Router();

const submissionController = require("../controllers/submission");

const { restrictToLoggedInUserOnly } = require("../middleware/auth");

router.post(
  "/:id",
  restrictToLoggedInUserOnly,
  submissionController.handleCodeSubmission,
);

router.get(
  "/:id",
  restrictToLoggedInUserOnly,
  submissionController.handleGetSubmission,
);

module.exports = router;
