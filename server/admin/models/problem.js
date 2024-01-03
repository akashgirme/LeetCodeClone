const { json } = require("body-parser");
const db = require("../../connection/database");

const deleteTestCasesByProblemIdFromDB = (problemId, callback) => {
  db.query(
    "SELECT * FROM problem WHERE problem_id = ?",
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
        "DELETE FROM testcase WHERE problem_id = ?",
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
    "DELETE FROM submission WHERE problem_id = ?",
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
    "DELETE FROM problem WHERE problem_id = ?",
    [problemId],
    (error, result) => {
      if (error) {
        console.error(
          "This is delete Problem MySQL query error (problem delete):",
          error,
        );
        return callback(error, null);
      } else {
        return callback(null, result);
      }
    },
  );
};

const addSolutionToDB = (problemId, solution, callback) => {
  db.query(
    "SELECT * FROM problem WHERE problem_id = ?",
    [problemId],
    (problemErr, problemResult) => {
      if (problemErr) {
        console.error("Error checking problem:", problemErr);
        return callback(problemErr, null);
      }

      if (problemResult.length === 0) {
        // No problem with the specified problemId was found
        console.log("No problem Found");
        const problemErr = json({ message: "No Problem Found" });
        return callback(problemErr, null);
      }

      // Insert the solution into the database
      db.query(
        "INSERT INTO solution (problem_id, solution) VALUES (?, ?)",
        [problemId, solution],
        (solutionErr, solutionResult) => {
          if (solutionErr) {
            console.error("Error inserting solution:", solutionErr);
            return callback(solutionErr, null);
          } else {
            return callback(null, solutionResult);
          }
        },
      );
    },
  );
};

const addProblemToDB = (problemData, testCases, callback) => {
  // Start a database transaction
  db.beginTransaction((beginTransactionErr) => {
    if (beginTransactionErr) {
      console.error("MySQL transaction error:", beginTransactionErr);
      return callback(beginTransactionErr, null);
    }

    console.log(
      problemData.title,
      problemData.difficulty,
      problemData.description,
      problemData.exampleInput,
      problemData.exampleOutput,
      problemData.exampleExplanation,
    );

    // Insert the problem details into the "problems" table
    db.query(
      "INSERT INTO problem (title, difficulty, description, example_input, example_output, example_explanation) VALUES (?, ?, ?, ?, ?, ?)",
      [
        problemData.title,
        problemData.difficulty,
        problemData.description,
        problemData.exampleInput,
        problemData.exampleOutput,
        problemData.exampleExplanation,
      ],
      (problemInsertErr, problemInsertResults) => {
        if (problemInsertErr) {
          // Rollback the transaction on error
          db.rollback(() => {
            console.error("MySQL query error (problem):", problemInsertErr);
            return callback(problemInsertErr, null);
          });
        }

        db.query(
          "SELECT * FROM problem WHERE title = ?",
          [problemData.title],
          (err, result) => {
            if (err) {
              return callback(err, null);
            }
            problemId = result[0].problem_id;

            // Get the auto-generated ProblemId from the inserted problem
            // const problemId = problemInsertResults.insertId;

            // Insert the test cases into the "testcases" table
            const testCasesInsertQuery =
              "INSERT INTO testcase (problem_id, input, expected_output) VALUES ?";
            const testCasesValues = testCases.map((testCase) => [
              problemId,
              testCase.input,
              testCase.expectedOutput,
            ]);

            db.query(
              testCasesInsertQuery,
              [testCasesValues],
              (testCasesInsertErr) => {
                if (testCasesInsertErr) {
                  // Rollback the transaction on error
                  db.rollback(() => {
                    console.error(
                      "MySQL query error (test cases):",
                      testCasesInsertErr,
                    );
                    return callback(testCasesInsertErr, null);
                  });
                }

                // Commit the transaction if both problem and test cases are inserted successfully
                db.commit((commitErr) => {
                  if (commitErr) {
                    // Rollback the transaction on error
                    db.rollback(() => {
                      console.error(
                        "MySQL transaction commit error:",
                        commitErr,
                      );
                      return callback(commitErr, null);
                    });
                  }

                  // Send a response to the client, indicating the success of the insert operation
                  const result = {
                    message: "Problem and Test Cases Added Successfully",
                  };
                  return callback(null, result);
                });
              },
            );
          },
        );
      },
    );
  });
};

module.exports = {
  deleteTestCasesByProblemIdFromDB,
  deleteSubmissionFromDB,
  deleteProblemFromDB,
  addSolutionToDB,
  addProblemToDB,
};
