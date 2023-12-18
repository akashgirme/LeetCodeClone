import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AdminPanel from "../AdminPanel";
import { backendUrl } from "../constants";

const AddProblemWithTestCasesForm = () => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");
  const [exampleExplanation, setExampleExplanation] = useState("");
  const [testCases, setTestCases] = useState([
    { Input: "", ExpectedOutput: "" },
  ]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { Input: "", ExpectedOutput: "" }]);
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
        testCase.Input.trim() !== "" || testCase.ExpectedOutput.trim() !== "",
    );

    const data = {
      title,
      difficulty,
      description,
      exampleinput: exampleInput,
      exampleoutput: exampleOutput,
      exampleexplanation: exampleExplanation,
      testCases: filteredTestCases,
    };

    try {
      const response = await fetch(`${backendUrl}/addProblemWithTestCases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.msg); // Log the success message
      } else {
        // Handle errors here
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
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
                    value={testCase.Input}
                    onChange={(e) => {
                      const updatedTestCases = [...testCases];
                      updatedTestCases[index].Input = e.target.value;
                      setTestCases(updatedTestCases);
                    }}
                  />
                  <label>Expected Output:</label>
                  <textarea
                    value={testCase.ExpectedOutput}
                    onChange={(e) => {
                      const updatedTestCases = [...testCases];
                      updatedTestCases[index].ExpectedOutput = e.target.value;
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
      </Row>
    </Container>
  );
};

export default AddProblemWithTestCasesForm;
