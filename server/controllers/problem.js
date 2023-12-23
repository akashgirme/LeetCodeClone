const problemModel = require("../models/problem");
const bcrypt = require("bcrypt");
const auth = require("../service/auth");

const handleGetProblems = (req, res) => {
  problemModel.getProblemsFromDB((err, result) => {
    if (err) {
      return res.status(404).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
};

const handleGetProblemByID = (req, res) => {
  const problemID = parseInt(req.params.id);

  problemModel.getProblemsByIDFromDB(problemID, (err, result) => {
    if (err) {
      return res.status(404).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
};

const handleGetProblemSolution = (req, res) => {
  const problemId = parseInt(req.params.id);

  console.log(problemId);

  problemModel.getSolutionFromDB(problemId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      return res.status(200).json(result);
    }
  });
};

module.exports = {
  handleGetProblems,
  handleGetProblemByID,
  handleGetProblemSolution,
};
