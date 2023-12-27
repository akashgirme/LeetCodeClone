import React from "react";
import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Progress() {
  return (
    <div>
      <h1>Progress</h1>
      <Card>
        <Box style={{width:'5rem', height:'auto'}}>
          <CircularProgress variant="determinate" value={40} />
        </Box>
        


      </Card>
    </div>
  );
}

export default Progress;
