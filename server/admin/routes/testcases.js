const express = require("express");

const router = express.Router();

const adminTestCaseController = require("../controller/testcases");

const { restrictToLoggedInAdminOnly } = require("../../middleware/auth");

router.get(
  "/",
  restrictToLoggedInAdminOnly,
  adminTestCaseController.handleGetTestCases,
);
router.post(
  "/testCasesForProblem",
  restrictToLoggedInAdminOnly,
  adminTestCaseController.handleGetTestCasesById,
);
router.post(
  "/addTestCases",
  restrictToLoggedInAdminOnly,
  adminTestCaseController.handleAddTestCases,
);
router.post(
  "/deleteTestCases",
  restrictToLoggedInAdminOnly,
  adminTestCaseController.handleDeleteTestcase,
);

module.exports = router;
