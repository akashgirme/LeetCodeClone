import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { backendUrl } from '../constants';

const AddTestCase = () => {
  const [problemId, setProblemId] = useState('');
  const [testCases, setTestCases] = useState([{ Input: '', ExpectedOutput: '' }]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { Input: '', ExpectedOutput: '' }]);
  };

  const handleRemoveTestCase = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      problemId,
      testCases,
    };

    try {
      const response = await fetch(`${backendUrl}/addTestCasesForProblem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.msg); // Log the success message
      } else {
        // Handle errors here
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Container>
      <h2>Add Test Cases for Problem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Problem ID:</label>
          <input
            type="number"
            value={problemId}
            onChange={(e) => setProblemId(e.target.value)}
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
            <button type="button" onClick={() => handleRemoveTestCase(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTestCase}>
          Add Test Case
        </button>
        <button type="submit">Submit</button>
      </form>
      </Container>
    </div>
  );
};

export default AddTestCase;
