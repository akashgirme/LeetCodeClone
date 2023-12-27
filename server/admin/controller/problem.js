const { json } = require("body-parser");
const adminProblemModel = require("../models/problem");

const handleDeleteProblem = (req, res) => {
  const problemId = parseInt(req.body.problemId);

  adminProblemModel.deleteTestCasesByProblemIdFromDB(
    problemId,
    (testCaseError, testCaseResult) => {
      if (testCaseError) {
        return res.status(404).json({ message: "Internal Server Error" });
      }

      adminProblemModel.deleteSubmissionFromDB(
        problemId,
        (submissionError, submissionResult) => {
          if (submissionError) {
            return res.status(500).json({ message: "Internal Server Error" });
          }

          adminProblemModel.deleteProblemFromDB(
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

const handleAddSolution = (req, res) => {
  const problemId = parseInt(req.body.problemId);
  const solution = req.body.solution;

  adminProblemModel.addSolutionToDB(problemId, solution, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result) {
      return res.status(200).json({ message: "Solution Added Successfully" });
    }
  });
};

const handleAddProblem = (req, res) => {
  const problemData = req.body;
  const testCases = req.body.testCases;

  adminProblemModel.addProblemToDB(problemData, testCases, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      return res.status(200).json({ message: "Problem Added Successfully" });
    }
  });
};

const handleNothing = (req, res) => {
  return;
};

module.exports = {
  handleDeleteProblem,
  handleNothing,
  handleAddSolution,
  handleAddProblem,
};
