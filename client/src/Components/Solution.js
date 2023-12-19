import React from "react";
import { Row, Col, Container, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CodeExecution from "./CodeExecution";
import { backendUrl } from "./constants";
import Button from "@mui/material/Button";

function Solution() {
  const { id } = useParams();
  const cleanId = id.substring(1);
  const [submission, setSubmission] = useState("");
  const [problems, setProblems] = useState([]);
  const [solution, setSolution] = useState();
  const email = localStorage.getItem("email");

  console.log(submission);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch(`${backendUrl}/problems/${cleanId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProblems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [cleanId]);

  const problem = problems[0];

  if (!problem) {
    // Handle the case where the data is still loading or an error occurred
    return <div>Loading...</div>;
  }

  const fetchSolution = () => {
    // Fetch data from the server when the component mounts
    fetch(`${backendUrl}/solution/${cleanId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setSolution(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchSubmission = async () => {
    const requestBody = {
      problemId: cleanId,
      email: email,
    };

    const response = await fetch(`${backendUrl}/fetch-submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      const SubmissionData = await response.json();
      setSubmission(SubmissionData);
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
                        {problem.problemid}
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
                          {problem.exampleinput}
                        </pre>
                      </li>
                      <li>
                        <strong>Example Output</strong>
                        <br />
                        <pre className="px-5 pt-2 text-monospace">
                          {problem.exampleoutput}
                        </pre>
                      </li>
                      <li>
                        <strong>Explanation</strong>
                        <br />
                        {problem.exampleexplanation}
                      </li>
                    </ul>
                  ) : (
                    // You can add a loading indicator here, or an error message for failed requests
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
                          <pre>{sol.solution_text}</pre>
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
                {/* can we desabled with 'disabled' keyword */}
                <div className="p-5">
                  {submission.code && submission.code.length > 0 ? (
                    <pre>{submission.code}</pre>
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
        </Container>
      </Col>
      <Col sm md lg="6">
        <CodeExecution ProblemId={cleanId} />
      </Col>
    </Container>
  );
}

export default Solution;
