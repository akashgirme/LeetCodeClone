import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { backendUrl } from "./constants";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch(`${backendUrl}/api/problem`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProblems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Grid container className="d-flex justify-content-center">
      <Grid item xs={11} md={11} lg={11}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th width='5%'>
                <Typography variant="h6" style={{padding:'10px 0px', margin:'0 0.5rem'}}>Status</Typography>
              </th>
              <th width="60%">
                <Typography variant="h6" style={{padding:'10px 0px', margin:'0 0.5rem'}}>Title</Typography>
              </th>
              <th width="25%">
                <Typography variant="h6" style={{padding:'10px 0px', margin:'0 0.5rem'}}>Difficulty</Typography>
              </th>
            </tr>
          </thead>

          <tbody>
            {problems && problems.length > 0 ? (
              problems.map((prob, index) => (
                <tr>
                  <td>
                    ......
                  </td>
                  <Link style={{textDecoration:'none'}}
                    to={`/problems/:${prob.problem_id}`}
                    className="d-flex align-items-center"
                  >
                    <td>
                      <Typography variant="subtitle1" style={{padding:'10px 0px', margin:'0 0.5rem'}}>{index +1 }. {prob.title}</Typography>
                    </td>
                  </Link>
                  <td>
                    <Typography variant="subtitle1" style={{padding:'10px 0px', margin:'0 0.5rem'}}>
                      {prob.difficulty}
                    </Typography>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <Typography variant="h5">No problems available.</Typography>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Grid>
    </Grid>
  );
}

export default ProblemList;
