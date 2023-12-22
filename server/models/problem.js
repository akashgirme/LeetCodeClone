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

const getSolutionFromDB = (problemId, callback) => {
  db.query(
    "SELECT * FROM solutions WHERE problemid = ?",
    [problemId],
    (getSolutionErr, getSolutionResult) => {
      if (getSolutionErr) {
        console.log("MySQL query error", getSolutionErr);
        return callback(getSolutionErr, null);
      } else {
        console.log(getSolutionResult);
        return callback(null, getSolutionResult);
      }
    },
  );
};



module.exports = {
  getProblemsFromDB,
  getProblemsByIDFromDB,
  getSolutionFromDB,
};
