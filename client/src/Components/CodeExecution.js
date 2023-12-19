import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { backendUrl } from "./constants";
import Button from "@mui/material/Button";

function CodeExecution(props) {
  const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState("");
  const [output, setOutput] = useState("");
  //  const [ProblemID, setProblemID] = useState('');
  const [stderr, setStderr] = useState("");
  const [compileOutput, setCompileOutput] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState();
  const ProblemId = props.ProblemId;
  //const[testcaseInput, setTestcaseInput]= useState();
  const email = localStorage.getItem("email");

  console.log(email);
  console.log(ProblemId, typeof ProblemId);
  console.log(output, typeof output);
  console.log(code);
  console.log(testCases);

  useEffect(() => {
    const storedCode = sessionStorage.getItem("code");
    if (storedCode) {
      setCode(storedCode);
    }
    //setProblemID(ProblemId);
    // Fetch test cases associated with the specific problem from the server
    fetchTestCasesForProblem();
  }, [ProblemId]);

  const fetchTestCasesForProblem = async () => {
    try {
      // Make a GET request to fetch test cases for the specific problem
      const response = await fetch(
        `${backendUrl}/testcasesforProblem/${ProblemId}`,
      );
      if (response.ok) {
        const testCasesData = await response.json();
        setTestCases(testCasesData);
      } else {
        console.error("Error fetching test cases");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const executeCode = async () => {
    // Create a request payload in the required format
    const requestBody = {
      language: "c++",
      version: "10.2.0",
      runtime: "gcc",
      files: [
        {
          name: "main.cpp",
          content: code, // Use the code entered in the text box
        },
      ],
      stdin: testCases.map((testCase) => testCase.input).join("\n"), // Use the test cases entered in the text box
    };

    try {
      // Make a POST request to the public API
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        setOutput(result.run.output);
        setStderr(result.run.stderr);
        setCompileOutput(result.compile.output);
      } else {
        setOutput("Error executing code");
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error executing code");
    }
  };

  const submitCode = async () => {
    // Create a request payload in the required format
    const requestBody = {
      email: email,
      problemId: ProblemId,
      code: code,
      output: output,
    };

    console.log("This is ProblemID inside submitCode", ProblemId);

    try {
      // Make a POST request to the public API
      const response = await fetch(`${backendUrl}/submit-problem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmissionStatus(result.msg);
        setTimeout(() => setSubmissionStatus(""), 4000);
      } else {
        setSubmissionStatus("Error submitting code");
        setTimeout(() => setSubmissionStatus(""), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionStatus("Error submitting code");
      setTimeout(() => setSubmissionStatus(""), 3000);
    }
  };

  const handleCodeBlur = () => {
    sessionStorage.setItem("code", code);
  };

  return (
    <div>
      <Container>
        <div className="d-flex m-0 p-0">
          <p className="m-0">Write your code in C++</p>
        </div>
        <div className="w-100 ">
          <textarea
            className="w-100"
            style={{ height: "55vh" }}
            placeholder="Enter your code here"
            value={code}
            onBlur={handleCodeBlur}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          {submissionStatus ? <p>{submissionStatus}</p> : <></>}
        </div>
        <div
          className="overflow-auto text-wrap w-100 mt-0 border"
          style={{ height: "18vh" }}
        >
          <p>
            <strong>Output:</strong>
          </p>
          {compileOutput ? (
            <div>
              <pre class="text-monospace text-danger">{compileOutput}</pre>
              <pre class="text-monospace text-warning">{stderr}</pre>
            </div>
          ) : (
            <pre>{output}</pre>
          )}
        </div>
        <div className="d-flex flex-column">
          <ul className="d-flex align-items-center justify-content-end list-unstyled">
            <li className="p-2">
              <Button variant="outlined" onClick={executeCode}>
                Run
              </Button>
            </li>
            <li className="p-2">
              <Button variant="contained" onClick={submitCode}>
                Submit
              </Button>
            </li>
          </ul>
        </div>
        {/*<div>{testCases ? (testCases.map((testcase) => (<pre>{testcase.input}</pre>))): <p>No test Caes</p>}</div> */}
      </Container>
    </div>
  );
}

export default CodeExecution;
