const testCasesModel = require("../models/testcases");

const handleGetTestCasesForProblem = (req, res) => {
  const problemId = parseInt(req.params.id);

  testCasesModel.getTestCasesForProblem(problemId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      return res.status(200).json(result);
    }
  });
};

module.exports = {
  handleGetTestCasesForProblem,
};
