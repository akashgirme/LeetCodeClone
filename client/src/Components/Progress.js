import React, { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const Progress = ({ solvedProblems, totalProblems }) => {
  const progress = (solvedProblems / totalProblems) * 100;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Progress: {solvedProblems} out of {totalProblems} problems solved
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
