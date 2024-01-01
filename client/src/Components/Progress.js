import React, { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import { useEffect } from "react";
import { backendUrl } from "./constants";

const Progress = () => {

  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const progress = (totalSubmissions / totalProblems) * 100;
  const token = localStorage.getItem('jwtToken');


  const fetchSubmissionForUser = () => {
    fetch(`${backendUrl}/api/submit/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalSubmissions(data.length);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/problem`);
        const data = await response.json();
        setTotalProblems(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      fetchSubmissionForUser();
    };

    fetchProblems();
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Progress: {totalSubmissions} out of {totalProblems} problems solved
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: '100%', marginBottom: 2 }}
      />
      
      <Typography variant="body2" color="textSecondary">
        {Math.round(progress)}% completed
      </Typography>
    </div>
  );
};

export default Progress;
