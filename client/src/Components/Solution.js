import React from "react";
import { Row, Col, Container, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router";
import { useState, useEffect, useCallback } from "react";
import CodeExecution from "./CodeExecution";
import { backendUrl } from "./constants";
import Button from "@mui/material/Button";

function Solution() {
  const { id } = useParams();
  const problemId = id.substring(1);
  const [submission, setSubmission] = useState("");
  const [problems, setProblems] = useState([]);
  const [solution, setSolution] = useState();
  const [testCases, setTestCases] = useState([]);

  const fetchTestCasesForProblem = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/api/testcases/${problemId}`);
      if (response.ok) {
        const testCasesData = await response.json();
        setTestCases(testCasesData);
      } else {
        console.error("Error fetching test cases");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [problemId]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch(`${backendUrl}/api/problem/${problemId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProblems(data))
      .catch((error) => console.error("Error fetching data:", error));

    fetchTestCasesForProblem();
  }, [problemId, fetchTestCasesForProblem]);

  const problem = problems[0];

  if (!problem) {
    // Handle the case where the data is still loading or an error occurred
    return <div>Loading...</div>;
  }

  const fetchSolution = () => {
    // Fetch data from the server when the component mounts
    fetch(`${backendUrl}/api/problem/solution/${problemId}`, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setSolution(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchSubmission = async () => {
    const response = await fetch(
      `${backendUrl}/api/submission/get/${problemId}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (response.ok) {
      try {
        const submissionData = await response.json();

        if (submissionData && submissionData.length > 0) {
          const getSubmission = submissionData[0];

          if (getSubmission.code) {
            setSubmission(getSubmission.code);
          } else {
            setSubmission("No Submission Found For Problem");
          }
        } else {
          setSubmission("No submission Found For Problem");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setSubmission("Error Fetching Submission Data");
      }
    } else {
      console.error("Response not OK:", response.statusText);
      setSubmission("Error Fetching Submission Data");
    }
  };

  return (
    <Container fluid className="d-flex w-100 mt-5">
      <Col sm lg md="6">
        <Container>
          <Row>
            <Tabs
              defaultActiveKey="Description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="Description" title="Description">
                <div>
                  {problem ? (
                    <ul className="list-unstyle">
                      <li>
                        <strong>Problem Id: </strong>
                        {problem.problem_id}
                      </li>
                      <li>
                        <strong>Title: </strong>
                        {problem.title}
                      </li>
                      {/* <pre>This tag is for preserving text formatting</pre> */}
                      <li>
                        <strong>Description: </strong>
                        <pre className="px-4 text-wrap">
                          {problem.description}
                        </pre>
                      </li>
                      <li>
                        <strong>Example Input:</strong>
                        <br />
                        <pre className="px-5 pt-2 text-monospace">
                          {problem.example_input}
                        </pre>
                      </li>
                      <li>
                        <strong>Example Output</strong>
                        <br />
                        <pre className="px-5 pt-2 text-monospace">
                          {problem.example_output}
                        </pre>
                      </li>
                      <li>
                        <strong>Explanation</strong>
                        <br />
                        {problem.example_explanation}
                      </li>
                    </ul>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </Tab>
              <Tab eventKey="solution" title="Solution">
                <div className="p-5">
                  {solution && solution.length > 0 ? (
                    <div>
                      {solution.map((sol, index) => (
                        <div>
                          <pre>{sol.solution}</pre>
                        </div>
                        // <pre> For preserving text Format </pre>
                      ))}
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      variant="outlined"
                      onClick={fetchSolution}
                    >
                      Get Solution
                    </Button>
                  )}
                </div>
              </Tab>
              <Tab eventKey="submission" title="Submission">
                {" "}
                <div className="p-5">
                  {submission && submission.length > 0 ? (
                    <pre>{submission}</pre>
                  ) : (
                    <Button
                      type="submit"
                      variant="outlined"
                      onClick={fetchSubmission}
                    >
                      Get Submission
                    </Button>
                  )}
                </div>
              </Tab>
            </Tabs>
          </Row>
          <Row>
            <div className="d-flex flex-column mt-4">
              <h6>
                <strong>TestCases:</strong>
              </h6>
              {testCases && testCases.length > 0 ? (
                <div className="d-flex">
                  {testCases.map((testcase, index) => (
                    <div className="d-flex flex-column m-4">
                      <p>
                        <strong>Test Case: {`${index + 1}`}</strong>
                      </p>
                      <p>
                        Test Input: <pre>{testcase.input}</pre>
                      </p>
                      <p>
                        Test Output: <pre>{testcase.expected_output}</pre>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p> Failed to Load Testcases</p>
              )}
            </div>
          </Row>
        </Container>
      </Col>
      <Col sm md lg="6">
        <CodeExecution problemId={problemId} />
      </Col>
    </Container>
  );
}

export default Solution;
