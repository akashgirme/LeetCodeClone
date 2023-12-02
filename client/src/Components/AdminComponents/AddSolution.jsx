import React, { useState } from 'react';
import { backendUrl } from '../constants';

function AddSolution() {
  const [problemid, setProblemId] = useState('');
  const [solution_text, setSolutionText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { problemid:problemid, solution_text:solution_text };

    try {
      const response = await fetch(`${backendUrl}/addSolution`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.msg); // Log the success message
        setError(result.msg);
      } else {
        // Handle errors here
        setError('Failed to add solution.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add solution.');
    }
  };

  return (
    <div>
      <h2>Add Solution for a Problem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Problem ID:</label>
          <input
            type="number"
            value={problemid}
            onChange={(e) => setProblemId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Solution Text:</label>
          <textarea
            value={solution_text}
            onChange={(e) => setSolutionText(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddSolution;
