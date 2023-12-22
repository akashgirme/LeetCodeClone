const adminTestCaseModel = require("../models/testcases");

const handleGetTestCases = (req, res) => {
  adminTestCaseModel.getTestCasesFromDB((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else return res.status(200).json(result);
  });
};

const handleGetTestCasesById = (req, res) => {
  const problemId = req.body.problemId;

  adminTestCaseModel.getTestCaseByIdFromDB(problemId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internla Server Error" });
    } else res.status(200).json(result);
  });
};

const handleAddTestCases = (req, res) => {
  const problemId = req.body.problemId;
  const testCases = req.body.testCases;

  adminTestCaseModel.addTestCaseToDB(problemId, testCases, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else
      return res.status(200).json({ message: "TestCases Added Successfully" });
  });
};

const handleDeleteTestcase = (req, res) => {
  const testCaseId = req.body.testCaseId;

  adminTestCaseModel.deleteTestCaseFromDB(testCaseId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else
      return res.status(200).json({ message: "Testcase deleted Successfully" });
  });
};

module.exports = {
  handleGetTestCases,
  handleGetTestCasesById,
  handleAddTestCases,
  handleDeleteTestcase,
};
