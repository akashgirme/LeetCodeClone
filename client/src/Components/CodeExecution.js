import React, { useState, useEffect, useCallback } from "react";
import { Container, Spinner } from "react-bootstrap";
import Button from "@mui/material/Button";
import { backendUrl } from "./constants";
import MonacoEditor from "react-monaco-editor";

function CodeExecution(props) {
  const [code, setCode] = useState("// type your code in C++...");
  const [testCases, setTestCases] = useState([]);
  const [outputResults, setOutputResults] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [compileError, setCompileError] = useState(null);
  const problemId = props.problemId;
  const [canSubmit, setCanSubmit] = useState(false);
  const token = localStorage.getItem('jwtToken');

  const fetchTestCasesForProblem = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/api/testcases/${problemId}`);
      if (response.ok) {
        const testCasesData = await response.json();
        setTestCases(testCasesData);
      } else {
        setCompileError("Error fetching test cases");
      }
    } catch (error) {
      setCompileError("Error fetching test cases");
    }
  }, [problemId]);

  useEffect(() => {
    const storedCode = sessionStorage.getItem("code");
    if (storedCode) {
      setCode(storedCode);
    }
    fetchTestCasesForProblem();
  }, [problemId, fetchTestCasesForProblem]);

  const executeCode = async () => {
    setIsLoading(true);
    setCompileError(null);
    const results = [];

    for (const testCase of testCases) {
      const requestBody = {
        language: "c++",
        version: "10.2.0",
        runtime: "gcc",
        files: [
          {
            name: "main.cpp",
            content: code,
          },
        ],
        stdin: testCase.input,
      };

      try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const result = await response.json();

          if (result.compile && result.compile.output) {
            setCompileError(result.compile.output);
            setIsLoading(false);
            setCanSubmit(false);
            return;
          }

          const isTestCasePassed =
            result.run.output === testCase.expected_output;
          results.push({
            testCase,
            output: result.run.output,
            isError: result.run.stderr.length > 0,
          });

          if (!isTestCasePassed) {
            setCanSubmit(false);
          } else setCanSubmit(true);
        } else {
          const compilationError = await response.json();
          setCompileError(compilationError.compile.error);
          setIsLoading(false);
          setCanSubmit(false);

          return;
        }
      } catch (error) {
        console.error("Error:", error);
        setCompileError("Error executing code");
        setIsLoading(false);
        setCanSubmit(false);

        return;
      }
    }

    setOutputResults(results);
    setIsLoading(false);
  };

  const submitCode = async () => {
    const requestBody = {
      code: code,
    };

    try {
      const response = await fetch(`${backendUrl}/api/submit/${problemId}`, {
        method: "POST",
        headers: {
          Authorization:`Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmissionStatus(result.message);
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

  const editorDidMount = (editor, monaco) => {
    editor.focus();
  };

  const onChange = (newValue, e) => {
    setCode(newValue);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <div>
      <Container>
        <div className="w-100 " style={{ height: "60vh" }}>
          <MonacoEditor
            className="w-100"
            height="60vh"
            width="100%"
            language="cpp"
            theme="vs-dark"
            value={code}
            onBlur={handleCodeBlur}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
          ></MonacoEditor>
        </div>
        <div
          className="overflow-auto text-wrap w-100 mt-0 border"
          style={{ height: "18vh" }}
        >
          <p>
            <strong>Output:</strong>
          </p>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Running...</span>
            </Spinner>
          ) : compileError ? (
            <p>
              <pre class="text-monospace text-danger">{compileError}</pre>
            </p>
          ) : (
            outputResults.map((result, index) => (
              <div key={index}>
                <p>
                  <strong>Test Case {index + 1}:</strong>
                  {result.isError
                    ? "Error in Code Running"
                    : result.output === result.testCase.expected_output
                    ? "Passed"
                    : "Failed"}
                </p>
              </div>
            ))
          )}
        </div>
        <div>
          {submissionStatus && submissionStatus.length > 0 ? (
            <p>{submissionStatus}</p>
          ) : (
            <></>
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
              <Button
                variant="contained"
                onClick={submitCode}
                disabled={!canSubmit}
              >
                Submit
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default CodeExecution;
