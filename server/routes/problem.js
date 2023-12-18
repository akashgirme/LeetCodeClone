const express = require("express");
const problemController = require("../controllers/problem");

const router = express.Router();

router.get("/", problemController.handleGetProblems);
router.get("/:id", problemController.handleGetProblemByID);
router.post("/deleteProblem", problemController.handleDeleteProblem);

module.exports = router;