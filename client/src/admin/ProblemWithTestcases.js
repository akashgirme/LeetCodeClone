import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AdminPanel from "./AdminPanel";
import { backendUrl } from "../Components/constants";

const AddProblemWithTestCasesForm = () => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");
  const [exampleExplanation, setExampleExplanation] = useState("");
  const [error, setError] = useState("");
  const [testCases, setTestCases] = useState([
    { input: "", expectedOutput: "" },
  ]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "" }]);
  };

  const handleRemoveTestCase = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove empty test cases before submitting
    const filteredTestCases = testCases.filter(
      (testCase) =>
        testCase.input.trim() !== "" || testCase.expectedOutput.trim() !== "",
    );

    const data = {
      title,
      difficulty,
      description,
      exampleInput: exampleInput,
      exampleOutput: exampleOutput,
      exampleExplanation: exampleExplanation,
      testCases: filteredTestCases,
    };

    try {
      const response = await fetch(`${backendUrl}/api/admin/problem/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Log the success message
        setError(result.message);
      } else {
        // Handle errors here
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error in Adding Problem");
    }
  };

  return (
    <Container>
      <Row>
        <Col xs md lg="4">
          <Row>
            <AdminPanel />
          </Row>
        </Col>
        <Col className="md-8 lg-8">
          <div>
            <h2>Add Problem with Test Cases</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Difficulty:</label>
                <input
                  type="text"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Example Input:</label>
                <textarea
                  value={exampleInput}
                  onChange={(e) => setExampleInput(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Example Output:</label>
                <textarea
                  value={exampleOutput}
                  onChange={(e) => setExampleOutput(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Example Explanation:</label>
                <textarea
                  value={exampleExplanation}
                  onChange={(e) => setExampleExplanation(e.target.value)}
                  required
                />
              </div>
              <h3>Test Cases:</h3>
              {testCases.map((testCase, index) => (
                <div key={index}>
                  <label>Input:</label>
                  <textarea
                    value={testCase.input}
                    onChange={(e) => {
                      const updatedTestCases = [...testCases];
                      updatedTestCases[index].input = e.target.value;
                      setTestCases(updatedTestCases);
                    }}
                  />
                  <label>Expected Output:</label>
                  <textarea
                    value={testCase.expectedOutput}
                    onChange={(e) => {
                      const updatedTestCases = [...testCases];
                      updatedTestCases[index].expectedOutput = e.target.value;
                      setTestCases(updatedTestCases);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTestCase(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddTestCase}>
                Add Test Case
              </button>
              <button type="submit">Submit</button>
            </form>
          </div>
        </Col>
        <div>{error}</div>
      </Row>
    </Container>
  );
};

export default AddProblemWithTestCasesForm;
