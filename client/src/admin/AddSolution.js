import React, { useState } from "react";
import { backendUrl } from "../Components/constants";

function AddSolution() {
  const [problemId, setProblemId] = useState("");
  const [solution, setSolution] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { problemId: problemId, solution: solution };

    try {
      const response = await fetch(
        `${backendUrl}/api/admin/problem/addSolution`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Log the success message
        setError(result.message);
      } else {
        // Handle errors here
        setError("Failed to add solution.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add solution.");
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
            value={problemId}
            onChange={(e) => setProblemId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Solution Text:</label>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
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
