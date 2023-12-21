const express = require("express");
const problemController = require("../controllers/problem");

const router = express.Router();
const { restrictToLoggedInUserOnly } = require("../middleware/auth");

router.get("/", problemController.handleGetProblems);
router.get("/:id", problemController.handleGetProblemByID);
router.post(
  "/solution",
  restrictToLoggedInUserOnly,
  problemController.handleGetProblemSolution,
);
router.post("/deleteProblem", problemController.handleDeleteProblem);

module.exports = router;
