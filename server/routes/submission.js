const express = require('express');

const router = express.Router();

const submissionController = require('../controllers/submission');

const { restrictToLoggedInUserOnly } = require("../middleware/auth");

router.post('/', restrictToLoggedInUserOnly, submissionController.handleCodeSubmission);

module.exports = router;