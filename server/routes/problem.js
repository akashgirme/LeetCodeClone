const express = require("express");
const problemController = require("../controllers/problem");

const router = express.Router();
const { restrictToLoggedInUserOnly } = require("../middleware/auth");

router.get("/", problemController.handleGetProblems);
router.get("/:id", problemController.handleGetProblemByID);
router.get(
  "/solution/:id",
  restrictToLoggedInUserOnly,
  problemController.handleGetProblemSolution,
);

module.exports = router;
