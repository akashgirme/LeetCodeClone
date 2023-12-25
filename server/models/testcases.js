const db = require("../connection/database");

const getTestCasesForProblem = (problemId, callback) => {
  db.query(
    "SELECT * FROM testcase WHERE problem_id = ?",
    [problemId],
    (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    },
  );
};

module.exports = {
  getTestCasesForProblem,
};
