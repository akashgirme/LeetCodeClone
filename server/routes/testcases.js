const express = require("express");

const router = express.Router();

const testCasesController = require("../controllers/testcases");

//router.get("/", testCasesController.handleGetTestCases);

router.get("/:id", testCasesController.handleGetTestCasesForProblem);

module.exports = router;
