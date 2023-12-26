const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();


// Body Parser to Sending and Receiving request Body;
const bodyParser = require("body-parser");

const cors = require("cors");
const clientURL = process.env.CLIENT_URL;
app.use(cors({ credentials: true, origin: clientURL }));

// Json Parser For Passing Json
var jsonParser = bodyParser.json();
app.use(jsonParser);

// Cookies Parser For Sending and Receiving Cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', clientURL);
  res.header('Access-Control-Allow-Credentials', true); 
  next();
});


//
/*
app.use((req, res, next) => {

  res.cookie('jwtToken', jwtToken, { sameSite: 'None', secure: false });

  res.cookie('adminJwtToken', adminJwtToken, { sameSite: 'None', secure: false });

  next();
});


*/

//<------------------------User Routes --------------------------->

// User Routes
const userRouter = require("./routes/user");

app.use("/api/user", userRouter);
app.use("/api/user/register", userRouter);
app.use("/api/user/login", userRouter);

// Problem Routes
const problemRouter = require("./routes/problem");

app.use("/api/problem", problemRouter);
app.use("/api/problem/:id", problemRouter);
app.use("/api/problem/solution/:id", (req, res, next) => {
  res.cookie('jwtToken', jwtToken, { sameSite: 'None', secure: false });
  next();
}, problemRouter);

// TestCases Routes
const testCasesRouter = require("./routes/testcases");

app.use("/api/testcases", testCasesRouter);

//Submission Routes

const submissionRouter = require("./routes/submission");

app.use("/api/submit", submissionRouter);
app.use("/api/submission/get", submissionRouter);

// <-------------- Admin Panel or Admin Routes --------------------------->

// Admin Auth Routes
const adminAuthRouter = require("./admin/routes/auth");

app.use("/api/admin/auth", adminAuthRouter);

//Admin Problems Routes
const adminProblemRouter = require("./admin/routes/problem");

app.use("/api/admin/problem", adminProblemRouter);

// Route for TestCases
const adminTestCaseRouter = require("./admin/routes/testcases");

app.use("/api/admin/testcases", adminTestCaseRouter);
app.use("/api/admin/testcases/testCasesForProblem", adminTestCaseRouter);
app.use("/api/admin/testcases/addTestCases", adminTestCaseRouter);
app.use("/api/admin/testcase/deleteTestCases", adminTestCaseRouter);

//Port Mapping
app.listen(process.env.PORT || port, () => {
  console.log(`App listening on port ${port}`);
});
