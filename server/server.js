
const express = require("express");
const app = express();
const port = 5000;
var jwt = require("jsonwebtoken");
const { auth } = require("./middleware");
const JWT_SECRET = "secret";
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(cors());
app.use(jsonParser);
const bcrypt = require('bcrypt');
const db = require("./db");


// Route To Add Solution for Tha Problem
app.post('/addSolution/', (req, res) => {
  const problemid = parseInt(req.body.problemid, 10);
  const solution_text = req.body.solution_text;

  // Check if the problem with the specified problemId exists
  db.query(
    'SELECT * FROM problems WHERE problemid = ?',
    [problemid],
    (problemErr, problemResults) => {
      if (problemErr) {
        console.error('Error checking problem:', problemErr);
        return res.status(500).json({ msg: 'Internal server error' });
      }

      if (problemResults.length === 0) {
        // No problem with the specified problemId was found
        return res.status(404).json({ msg: 'Problem not found' });
      }

      // Insert the solution into the database
      db.query(
        'INSERT INTO solutions (problemid, solution_text) VALUES (?, ?)',
        [problemid, solution_text],
        (solutionErr, solutionResults) => {
          if (solutionErr) {
            console.error('Error inserting solution:', solutionErr);
            return res.status(500).json({ msg: 'Internal server error' });
          }

          // Return a success message or the inserted solution details
          res.json({ msg: 'Solution added successfully', solutionId: solutionResults.insertId });
        }
      );
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route To fetch Solution by ProblemId
app.get('/solution/:id', (req, res) => {
  const problemid = req.params.id;

  // Query the database to retrieve problem which matches problemId
  db.query('SELECT * FROM solutions WHERE problemid = ?',[problemid], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ msg: 'Internal server error' });
    }

    // Send the retrieved problems as a JSON response
    res.json(results);
  });
});
//<------------------------- End of Route ----------------------------->


// Route to Submit the Problem 

app.post("/submit-problem", (req, res) => {
  const { code, problemId, email, output } = req.body;
  const INTProblemId = parseInt(problemId, 10);
  console.log(code, typeof(code));
  console.log(problemId, typeof(problemId));
  console.log(email, typeof(email));
  console.log(output, typeof(output));
  console.log(INTProblemId);

  // Step 1: Find the user_id based on the user's email
  db.query(
    "SELECT user_id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("MySQL query error:", err);
        return res.status(500).json({ msg: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      const userId = results[0].user_id;

      db.query(
        "SELECT * FROM submission WHERE user_id = ? AND problemid = ?",
        [userId, INTProblemId],
        (existingSubmissionErr, existingSubmissionResults) => {
          if (existingSubmissionErr) {
            console.error("MySQL query error:", existingSubmissionErr);
            return res.status(500).json({ msg: "Internal server error" });
          }

          if (existingSubmissionResults.length > 0) {
            return res.status(400).json({ msg: "Submission already exists for this problem" });
          }

      // Step 2: Fetch the expected output from the database
        db.query(
          "SELECT Expectedoutput FROM testcases WHERE problemid = ?",
          [INTProblemId],
          (outputErr, outputResults) => {
            if (outputErr) {
              console.error("MySQL query error:", outputErr);
              return res.status(500).json({ msg: "Internal server error" });
            }

            if (outputResults.length === 0) {
              return res.status(404).json({ msg: "Expected output not found" });
            }

            const expectedOutput = outputResults[0].Expectedoutput;
            console.log(expectedOutput, typeof(expectedOutput));

            // Step 3: Check if the output matches the expected output
            if (output === expectedOutput) {
              // Step 4: Store the submission in the submissions table
              db.query(
                "INSERT INTO submission (user_id, problemid, code) VALUES (?, ?, ?)",
                [userId, INTProblemId, code],
                (insertErr) => {
                  if (insertErr) {
                    console.error("MySQL query error:", insertErr);
                    return res.status(500).json({ msg: "Internal server error" });
                  }

                  return res.status(200).json({ msg: "Submission successful" });
                }
              );
            } else {
              return res.status(400).json({ msg: "Test case failed" });
            }
          }
        );
      }
      );
    }
  );
});
//<------------------------- End of Route ----------------------------->



app.post("/fetch-submission", (req, res) => {
  const { problemId, email } = req.body;
  console.log(problemId, typeof(problemId));
  console.log(email, typeof(email));

  // Step 1: Find the user_id based on the user's email
  db.query(
    "SELECT user_id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("MySQL query error:", err);
        return res.status(500).json({ msg: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      const userId = results[0].user_id;

      // Step 2: Retrieve the submission for the specified problemId and user
      db.query(
        "SELECT code FROM submission WHERE user_id = ? AND problemid = ?",
        [userId, problemId],
        (submissionErr, submissionResults) => {
          if (submissionErr) {
            console.error("MySQL query error:", submissionErr);
            return res.status(500).json({ msg: "Internal server error" });
          }

          if (submissionResults.length === 0) {
            return res.status(404).json({ msg: "Submission not found" });
          }

          const submission = submissionResults[0].code;

          // Return the submission code
          return res.status(200).json({ code: submission });
        }
      );
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route to fetch problems from Database ->

app.get("/problems", (req, res) => {
  
  // Query the database to retrieve all problems
  db.query('SELECT * FROM problems', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ msg: 'Internal server error' });
    }

    // Send the retrieved problems as a JSON response
    res.json(results);
  
  });
});
//<------------------------- End of Route ----------------------------->


// Route for fetch specific problem based on thoer ProblemId from Database

app.get('/problems/:id', (req, res) => {
  const id = req.params.id;

  // Query the database to retrieve problem which matches problemId
  db.query('SELECT * FROM problems WHERE problemid = ?',[id], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ msg: 'Internal server error' });
    }

    // Send the retrieved problems as a JSON response
    res.json(results);
  });
});
//<------------------------- End of Route ----------------------------->


// Route to Delete a Problem From Database via specific ProblemId ->

app.delete('/deleteProblem', (req, res) => {
  const problemid = parseInt(req.body.problemid, 10);

  // Check if the problem with the specified problemid exists
  db.query(
    'SELECT * FROM problems WHERE problemid = ?',
    [problemid],
    (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ msg: 'Internal server error' });
      }

      if (results.length === 0) {
        // No problem with the specified problemid was found
        return res.status(404).json({ msg: 'Problem not found' });
      }

      // If a problem with the specified problemid exists, delete its associated test cases
      db.query(
        'DELETE FROM testcases WHERE ProblemId = ?',
        [problemid],
        (testCasesDeleteErr) => {
          if (testCasesDeleteErr) {
            console.error('MySQL query error (test cases delete):', testCasesDeleteErr);
            return res.status(500).json({ msg: 'Internal server error' });
          }

          // After the associated test cases are deleted successfully, proceed to delete the problem
          db.query(
            'DELETE FROM problems WHERE problemid = ?',
            [problemid],
            (problemDeleteErr) => {
              if (problemDeleteErr) {
                console.error('MySQL query error (problem delete):', problemDeleteErr);
                return res.status(500).json({ msg: 'Internal server error' });
              }

              // Send a response to the client, indicating the successful deletion
              res.json({ msg: 'Problem and associated test cases deleted successfully' });
            }
          );
        }
      );
    }
  );
});
//<------------------------- End of Route ----------------------------->


//Route to Create a new problem along with its test cases ->

app.post('/addProblemWithTestCases', (req, res) => {
  const { title, difficulty, description, exampleinput, exampleoutput, exampleexplanation, testCases } = req.body;

  // Check if a problem with the same title already exists
  db.query(
    'SELECT * FROM problems WHERE title = ?',
    [title],
    (checkProblemErr, checkProblemResults) => {
      if (checkProblemErr) {
        console.error('MySQL query error (check problem):', checkProblemErr);
        return res.status(500).json({ msg: 'Internal server error' });
      }

      if (checkProblemResults.length > 0) {
        return res.status(400).json({ msg: 'Problem with the same title already exists' });
      }

      // Start a database transaction (if supported by your database)
      db.beginTransaction((err) => {
        if (err) {
          console.error('MySQL transaction error:', err);
          return res.status(500).json({ msg: 'Internal server error' });
        }

        // Insert the problem details into the "problems" table
        db.query(
          'INSERT INTO problems (title, difficulty, description, exampleinput, exampleoutput, exampleexplanation) VALUES (?,?,?,?,?,?)',
          [title, difficulty, description, exampleinput, exampleoutput, exampleexplanation],
          (problemInsertErr, problemInsertResults) => {
            if (problemInsertErr) {
              // Rollback the transaction on error
              db.rollback(() => {
                console.error('MySQL query error (problem):', problemInsertErr);
                return res.status(500).json({ msg: 'Internal server error' });
              });
            }

            // Get the auto-generated ProblemId from the inserted problem
            const problemId = problemInsertResults.insertId;

            // Insert the test cases into the "testcases" table
            const testCasesInsertQuery = 'INSERT INTO testcases (ProblemId, Input, ExpectedOutput) VALUES ?';
            const testCasesValues = testCases.map((testCase) => [problemId, testCase.Input, testCase.ExpectedOutput]);

            db.query(testCasesInsertQuery, [testCasesValues], (testCasesInsertErr) => {
              if (testCasesInsertErr) {
                // Rollback the transaction on error
                db.rollback(() => {
                  console.error('MySQL query error (test cases):', testCasesInsertErr);
                  return res.status(500).json({ msg: 'Internal server error' });
                });
              }

              // Commit the transaction if both problem and test cases are inserted successfully
              db.commit((commitErr) => {
                if (commitErr) {
                  // Rollback the transaction on error
                  db.rollback(() => {
                    console.error('MySQL transaction commit error:', commitErr);
                    return res.status(500).json({ msg: 'Internal server error' });
                  });
                }

                // Send a response to the client, indicating the success of the insert operation
                res.json({ msg: 'Problem and test cases added successfully' });
              });
            });
          }
        );
      });
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route to fetch all TestCases from Database ->

app.get("/testcases", (req, res) => {
  
  // Query the database to retrieve all problems
  db.query('SELECT * FROM testcases', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ msg: 'Internal server error' });
    }

    // Send the retrieved problems as a JSON response
    res.json(results);
  
  });
});
//<------------------------- End of Route ----------------------------->

app.get("/testcasesforProblem/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Query the database to retrieve all problems
  db.query('SELECT * FROM testcases WHERE problemid = ?',[id],(err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ msg: 'Internal server error' });
    }

    // Send the retrieved problems as a JSON response
    res.json(results);
  
  });
});



//Route to add testcases for specific problem via problemId of that problem ->

app.post('/addTestCasesForProblem', (req, res) => {
  const { problemId, testCases } = req.body;

  // Validate `problemId` to ensure it exists in the `problems` table
  db.query('SELECT * FROM problems WHERE problemid = ?', [problemId], (problemQueryError, results) => {
    if (problemQueryError) {
      console.error('MySQL query error:', problemQueryError);
      return res.status(500).json({ msg: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    // Convert `testCases` to an array of arrays for bulk insertion
    const testCasesValues = testCases.map(testCase => [problemId, testCase.Input, testCase.ExpectedOutput]);

    // Insert the test cases into the `testcases` table using bulk insertion
    db.query(
      'INSERT INTO testcases (Problemid, input, Expectedoutput) VALUES ?',
      [testCasesValues],
      (testCaseInsertError) => {
        if (testCaseInsertError) {
          console.error('MySQL query error:', testCaseInsertError);
          return res.status(500).json({ msg: 'Failed to add test cases' });
        }
        // Respond with a success message if the test cases are added successfully
        res.json({ msg: 'Test cases added successfully' });
      }
    );
  });
});
//<------------------------- End of Route ----------------------------->


//Route for deleting Testcase by thier TestCaseId ->

app.delete('/deleteTestCase', (req, res) => {
  const testCaseId = parseInt(req.body.testcaseid, 10);

  // Check if the test case with the specified `testcaseid` exists
  db.query(
    'SELECT * FROM testcases WHERE testcaseid = ?',
    [testCaseId],
    (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ msg: 'Internal server error' });
      }

      if (results.length === 0) {
        // No test case with the specified `testcaseid` was found
        return res.status(404).json({ msg: 'Test Case not found' });
      }

      // If a test case with the specified `testcaseid` exists, delete it
      db.query(
        'DELETE FROM testcases WHERE testcaseid = ?',
        [testCaseId],
        (err, results) => {
          if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ msg: 'Internal server error' });
          }

          // Fetch updated test cases after deletion
          db.query('SELECT * FROM testcases', (fetchErr, updatedTestCases) => {
            if (fetchErr) {
              console.error('MySQL query error:', fetchErr);
              return res.status(500).json({ msg: 'Internal server error' });
            }

            // Send a response to the client, indicating the successful deletion and updated test cases
            res.json({ msg: 'Test Case deleted successfully', updatedTestCases });
          });
        }
      );
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route to fetch users list from users Table ->

app.get("/users", (req, res) => {
  
  // Query the database to retrieve all problems
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ msg: 'Internal server error' });
    }

    // Send the retrieved problems as a JSON response
    res.json(results);
  
  });
});
//<------------------------- End of Route ----------------------------->


// Route for user registration ->

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  // Check if the email already exists in the database
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("MySQL query error", err);
        return res.status(500).json({ msg: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(403).json({ msg: "Email already exists" });
      }

      // Hash the password before storing it
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error("Password hashing error", hashErr);
          return res.status(500).json({ msg: "Internal Server Error" });
        }

        // Insert the new user into the database with the hashed password
        db.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, hashedPassword],
          (insertErr) => {
            if (insertErr) {
              console.error("MySQL Query error", insertErr);
              return res.status(500).json({ msg: "Internal Server Error" });
            }

            return res.json({ msg: "User registered successfully" });
          }
        );
      });
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route for user login ->

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log("Received login request for email:", email);

  // Check if the user exists in the database
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("MySQL query error:", err);
        return res.status(500).json({ msg: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(403).json({ msg: "User not found" });
      }

      const user = results[0];

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (compareErr, isMatch) => {
        if (compareErr) {
          console.error("Password comparison error", compareErr);
          return res.status(500).json({ msg: "Internal server error" });
        }

        if (isMatch) {
          // Passwords match - create a JWT token for the user
          const token = jwt.sign(
            {
              id: user.id,
            },
            JWT_SECRET
          );
          return res.json({ token });
        } else {
          return res.status(403).json({ msg: "Incorrect password" });
        }
      });
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route to delete user from users table by Admin with the help of user_id -> 

app.delete('/deleteUser', (req, res) => {
  const user_id =parseInt(req.body.user_id, 10);

  // Check if the problem with the specified problemid exists
  db.query(
    'SELECT * FROM users WHERE user_id = ?',
    [user_id],
    (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ msg: 'Internal server error' });
      }

      if (results.length === 0) {
        // No problem with the specified problemid was found
        return res.status(404).json({ msg: 'User not found' });
      }

      // If a problem with the specified problemid exists, delete it
      db.query(
        'DELETE FROM users WHERE user_id = ?',
        [user_id],
        (err, results) => {
          if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ msg: 'Internal server error' });
          }

          // Send a response to the client, indicating the successful deletion
          res.json({ msg: 'User deleted successfully' });
        }
      );
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route for Admin Registration from primary admin(Akash) login window registration ->

app.post("/admin-signup", (req, res) => {
  const {name, email, password } = req.body; 
  console.log(name,email,password);

  if (!email || !password || !name) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  // Check if the email already exists in the database
  db.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("MySQL query error", err);
        return res.status(500).json({ msg: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(403).json({ msg: "Email already exists" });
      }

      // Hash the password before storing it
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error("Password hashing error", hashErr);
          return res.status(500).json({ msg: "Internal Server Error" });
        }

        // Insert the new user into the database with the hashed password
        db.query(
          "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          (insertErr) => {
            if (insertErr) {
              console.error("MySQL Query error", insertErr);
              return res.status(500).json({ msg: "Internal Server Error" });
            }

            return res.json({ msg: "User registered successfully" });
          }
        );
      });
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route for validate Admin Login ->

app.post("/admin-login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log("Received login request for email:", email);

  // Check if the user exists in the database
  db.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("MySQL query error:", err);
        return res.status(500).json({ msg: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(403).json({ msg: "User not found" });
      }

      const user = results[0];

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (compareErr, isMatch) => {
        if (compareErr) {
          console.error("Password comparison error", compareErr);
          return res.status(500).json({ msg: "Internal server error" });
        }

        if (isMatch) {
          // Passwords match - create a JWT token for the user
          const token = jwt.sign(
            {
              id: user.id,
            },
            JWT_SECRET
          );
          return res.json({ token });
        } else {
          return res.status(403).json({ msg: "Incorrect password" });
        }
      });
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Route to fetch Admins list from Admin Table ->

app.get("/admins", (req, res) => {
  
  // Query the database to retrieve all problems
  db.query('SELECT * FROM admin', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ msg: 'Internal server error' });
    }

    // Send the retrieved problems as a JSON response
    res.json(results);
  
  });
});
//<------------------------- End of Route ----------------------------->


// Route to delete admin form admin table via AdminId ->

app.delete('/deleteAdmin', (req, res) => {
  const adminId = parseInt(req.body.adminId, 10);

  // Check if the problem with the specified problemid exists
  db.query(
    'SELECT * FROM admin WHERE adminId = ?',
    [adminId],
    (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ msg: 'Internal server error' });
      }

      if (results.length === 0) {
        // No problem with the specified problemid was found
        return res.status(404).json({ msg: 'User not found' });
      }

      // If a problem with the specified problemid exists, delete it
      db.query(
        'DELETE FROM admin WHERE adminId = ?',
        [adminId],
        (err, results) => {
          if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ msg: 'Internal server error' });
          }

          // Send a response to the client, indicating the successful deletion
          res.json({ msg: 'User deleted successfully' });
        }
      );
    }
  );
});
//<------------------------- End of Route ----------------------------->


// Port calling of express server

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
