const express = require("express");

const router = express.Router();

const adminProblemController = require("../controller/problem");

const { restrictToLoggedInAdminOnly } = require("../../middleware/auth");

router.post(
  "/delete",
  restrictToLoggedInAdminOnly,
  adminProblemController.handleDeleteProblem,
);
router.post(
  "/addSolution",
  restrictToLoggedInAdminOnly,
  adminProblemController.handleAddSolution,
);
router.post(
  "/add",
  restrictToLoggedInAdminOnly,
  adminProblemController.handleAddProblem,
);

router.use((req, res) => {
  console.log("Request to /api/problem not handled:", req.url);
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
