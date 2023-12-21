const express = require('express');
require("dotenv").config();

const auth = require('../service/auth');

const submissionModel = require('../models/submission');

const handleCodeSubmission = (req, res) => {
    const problemId = parseInt(req.body.problemId);
    const code = req.body.code;
    const jwtToken = req.cookies.jwtToken;
    const email = auth.getEmailFromJWT(jwtToken);

    submissionModel.addSolutionToDB(problemId, code, email, (addSubmissionErr, addSubmissionResult) => {

        if (addSubmissionErr && addSubmissionErr.msg === 'Submission already exists for this problem') {
            return res.status(409).json({ message: 'Submission already exists for this problem' });
        }

        if (addSubmissionErr && addSubmissionErr.msg === 'No User Found') {
            return res.status(404).json({ message: 'Internal Server Error' });
        }

        if (addSubmissionErr) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if(addSubmissionResult){
            return res.status(200).json({ message: 'Submission added successfully' });
        }

    })
}



module.exports = {
    handleCodeSubmission,
}