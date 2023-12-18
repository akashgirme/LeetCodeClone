const db = require("../connection/database");

const getProblemsFromDB = (callback) => {
  db.query("SELECT * FROM problems", (error, result) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, result);
    }
  });
};

const getProblemsByIDFromDB = (problemId, callback) => {
  db.query(
    "SELECT * FROM problems WHERE problemid = ?",
    [problemId],
    (error, result) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, result);
      }
    },
  );
};

const deleteTestCasesByProblemIdFromDB = (problemId, callback) => {
  db.query(
    "SELECT * FROM problems WHERE problemid = ?",
    [problemId],
    (err, result) => {
      if (err) {
        console.error("This is Test Cases MySQL query error:", err);
        return callback(err, null);
      }

      if (result.length === 0) {
        return callback(err, null);
      }

      db.query(
        "DELETE FROM testcases WHERE ProblemId = ?",
        [problemId],
        (error, result) => {
          if (error) {
            console.error(
              " This is delete Test Cases MySQL query error (test cases delete):",
              error,
            );
            return callback(error, null);
          } else {
            return callback(null, result);
          }
        },
      );
    },
  );
};

const deleteSubmissionFromDB = (problemId, callback) => {
  db.query(
    "DELETE FROM submission WHERE problemid = ?",
    [problemId],
    (error, result) => {
      if (error) {
        console.error(
          "THis is delete submission MySQL query error (problem delete):",
          error,
        );
        return callback(error, null);
      } else {
        return callback(null, result);
      }
    },
  );
};

const deleteProblemFromDB = (problemId, callback) => {
  db.query(
    "DELETE FROM problems WHERE problemid = ?",
    [problemId],
    (error, result) => {
      if (error) {
        console.error(
          "THis is delete Problem MySQL query error (problem delete):",
          error,
        );
        return callback(error, null);
      } else {
        return callback(null, result);
      }
    },
  );
};

module.exports = {
  getProblemsFromDB,
  getProblemsByIDFromDB,
  deleteTestCasesByProblemIdFromDB,
  deleteSubmissionFromDB,
  deleteProblemFromDB,
};
