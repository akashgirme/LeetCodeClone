const express = require("express");

const router = express.Router();

const testCasesController = require("../controllers/testcases");

router.get("/", testCasesController.handleGetTestCases);

module.exports = router;
