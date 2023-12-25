const db = require("../../connection/database");

const getTestCasesFromDB = (callback) => {
  db.query("SELECT * FROM testcase", (err, result) => {
    if (err) {
      console.error("MySQL query error:", err);
      return callback(err, null);
    } else {
      return callback(null, result);
    }
  });
};

const getTestCaseByIdFromDB = (problemId, callback) => {
  db.query(
    "SELECT * FROM testcase WHERE problem_id = ?",
    [problemId],
    (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    },
  );
};

const addTestCaseToDB = (problemId, testCases, callback) => {
  db.query(
    "SELECT * FROM problem WHERE problem_id = ?",
    [problemId],
    (problemQueryError, results) => {
      if (problemQueryError) {
        console.error("MySQL query error:", problemQueryError);
        return callback(err, null);
      }

      if (results.length === 0) {
        return;
      }

      // Convert `testCases` to an array of arrays for bulk insertion
      const testCasesValues = testCases.map((testCase) => [
        problemId,
        testCase.input,
        testCase.expectedOutput,
      ]);

      // Insert the test cases into the `testcases` table using bulk insertion
      db.query(
        "INSERT INTO testcase (problem_id, input, expected_output) VALUES ?",
        [testCasesValues],
        (testCaseInsertError, insertionSuccess) => {
          if (testCaseInsertError) {
            console.error("MySQL query error:", testCaseInsertError);
            return callback(testCaseInsertError, null);
          } else {
            return callback(null, insertionSuccess);
          }
        },
      );
    },
  );
};

const deleteTestCaseFromDB = (testCaseId, callback) => {
  // Check if the test case with the specified `testcaseid` exists
  db.query(
    "SELECT * FROM testcase WHERE testcase_id = ?",
    [testCaseId],
    (err, results) => {
      if (err) {
        console.error("MySQL query error:", err);
        return callback(err, null);
      }

      if (results.length === 0) {
        // No test case with the specified `testcaseid` was found
        return;
      }

      // If a test case with the specified `testcaseid` exists, delete it
      db.query(
        "DELETE FROM testcase WHERE testcase_id = ?",
        [testCaseId],
        (err, results) => {
          if (err) {
            console.error("MySQL query error:", err);
            return callback(err, null);
          }

          // Fetch updated test cases after deletion
          db.query("SELECT * FROM testcase", (fetchErr, updatedTestCases) => {
            if (fetchErr) {
              console.error("MySQL query error:", fetchErr);
              return callback(fetchErr, null);
            } else {
              return callback(null, updatedTestCases);
            }
          });
        },
      );
    },
  );
};

module.exports = {
  getTestCasesFromDB,
  getTestCaseByIdFromDB,
  addTestCaseToDB,
  deleteTestCaseFromDB,
};
