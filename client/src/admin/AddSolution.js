import React, { useState } from "react";
import { backendUrl } from "../Components/constants";
import { Grid, Box } from "@mui/material";
import { TextField, Typography, Button, Stack } from "@mui/material";

function AddSolution() {
  const [problemId, setProblemId] = useState("");
  const [solution, setSolution] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // e.preventDefault();

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
    <Grid container>
      <Grid item>
        <Stack spacing={2}>
          <h2>Add Solution for a Problem</h2>
          <Box>
            <TextField
              type="number"
              variant="outlined"
              label="Problem ID"
              value={problemId}
              onChange={(e) => setProblemId(e.target.value)}
              required
            />
          </Box>
          <Box>
            <label>Add / Enter Solution</label>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              required
            />
          </Box>
          <Typography variant="h5">
            {error && <p className="error-message">{error}</p>}
          </Typography>
          <Button variant="contained" onclick={handleSubmit}>
            Add Solution
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default AddSolution;
