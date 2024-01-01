import React from "react";
import { useParams } from "react-router";
import { useState, useEffect, useCallback } from "react";
import CodeExecution from "./CodeExecution";
import { backendUrl } from "./constants";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Solution() {
  const { id } = useParams();
  const problemId = id.substring(1);
  const [submission, setSubmission] = useState("");
  const [problems, setProblems] = useState([]);
  const [solution, setSolution] = useState();
  const [testCases, setTestCases] = useState([]);
  const [value, setValue] = useState(0);
  const token = localStorage.getItem("jwtToken");

  const fetchTestCasesForProblem = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/api/testcases/${problemId}`, {
        method: "GET",
      });

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
    return <div>Loading...</div>;
  }

  const fetchSolution = () => {
    fetch(`${backendUrl}/api/problem/solution/${problemId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setSolution(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchSubmission = async () => {
    const response = await fetch(`${backendUrl}/api/submit/get/${problemId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

  // Event handler for tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container fluid mt="1rem" px="0.5rem" className="d-flex w-100">
      <Grid item sm lg="6" md="6" xl="6">
        <Grid container display="flex" flexDirection="column">
          <Grid item>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Description" />
              <Tab label="Solution" />
              <Tab label="Submission" />
            </Tabs>

            <Box hidden={value !== 0} mt="1rem">
              {problem ? (
                <ul className="list-unstyle">
                  <li>
                    <Typography variant="body1">
                      <strong>Problem Number: {problem.problem_id}</strong>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Title: </strong>
                      {problem.title}
                    </Typography>
                  </li>

                  <li>
                    <Typography variant="body1">
                      <strong>Description: </strong>
                    </Typography>
                    <pre px="1rem" pt="0.5rem" className="text-wrap">
                      {problem.description}
                    </pre>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Example Input: </strong>
                    </Typography>
                    <br />
                    <pre pt="0.5rem" className="text-monospace">
                      {problem.example_input}
                    </pre>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Example Output: </strong>
                    </Typography>
                    <br />
                    <pre pt="0.5rem" className="text-monospace">
                      {problem.example_output}
                    </pre>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Explanation: </strong>
                    </Typography>
                    <br />
                    {problem.example_explanation}
                  </li>
                </ul>
              ) : (
                <p>
                  <Typography variant="body1">Loading ..</Typography>
                </p>
              )}
            </Box>

            <Box hidden={value !== 1} className="p-5" mt="1rem">
              {solution && solution.length > 0 ? (
                <Box>
                  {solution.map((sol, index) => (
                    <Box>
                      <pre>{sol.solution}</pre>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={fetchSolution}
                >
                  Get Solution
                </Button>
              )}
            </Box>

            <Box hidden={value !== 2} className="p-5" mt="1rem">
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
            </Box>
          </Grid>
          <Grid item>
            <Box className="d-flex flex-column mt-4">
              <Typography variant="h6">
                <strong>TestCases:</strong>
              </Typography>
              {testCases && testCases.length > 0 ? (
                <Box display="flex">
                  {testCases.map((testcase, index) => (
                    <Box display="flex" flexDirection="column" m="1rem">
                      <Typography variant="body1">
                        <strong>Test Case: {`${index + 1}`}</strong>
                      </Typography>
                      <Typography variant="body1">
                        Test Input: <pre>{testcase.input}</pre>
                      </Typography>
                      <Typography variant="body1">
                        Test Output: <pre>{testcase.expected_output}</pre>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="subtitle1">
                  {" "}
                  Failed to Load Testcases
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm md="6" lg="6" xl="6">
        <CodeExecution problemId={problemId} />
      </Grid>
    </Grid>
  );
}

export default Solution;
