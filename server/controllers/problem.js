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
  const problemId = parseInt(req.body.problemId);

  console.log(problemId)

  problemModel.getSolutionFromDB(problemId, (err, result) => {
    if(err){
      return res.status(500).json({message:'Internal Server Error'});
    } else {
      return res.status(200).json(result);
    }
  })
}

const handleDeleteProblem = (req, res) => {
  const problemId = parseInt(req.body.problemId);

  problemModel.deleteTestCasesByProblemIdFromDB(
    problemId,
    (testCaseError, testCaseResult) => {
      if (testCaseError) {
        return res.status(404).json({ message: "Internal Server Error" });
      }

      problemModel.deleteSubmissionFromDB(
        problemId,
        (submissionError, submissionResult) => {
          if (submissionError) {
            return res.status(500).json({ message: "Internal Server Error" });
          }

          problemModel.deleteProblemFromDB(
            problemId,
            (problemError, problemResult) => {
              if (problemError) {
                return res
                  .status(404)
                  .json({ message: "Internal Server Error" });
              } else {
                return res
                  .status(200)
                  .json({ message: "Problem Deleted Successfully" });
              }
            },
          );
        },
      );
    },
  );
};

module.exports = {
  handleGetProblems,
  handleGetProblemByID,
  handleGetProblemSolution,
  handleDeleteProblem,
};
