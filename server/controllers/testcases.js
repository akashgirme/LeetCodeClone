const testCasesModel = require("../models/testcases");

const auth = require("../service/auth");

const handleGetTestCases = (req, res) => {
  const problemId = parseInt(req.body.problemId);

  testCasesModel.getTestCasesFromDB(problemId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      return res.status(200).json(result);
    }
  });
};

module.exports = {
  handleGetTestCases,
};
