import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { backendUrl } from "./constants";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function ProblemList() {

  const [problems, setProblems] = useState([]);
  const [userSubmission, setUserSubmission] = useState([]);
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
        setUserSubmission(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {

    const fetchProblems = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/problem`);
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      fetchSubmissionForUser();
    };

    fetchProblems();
  }, []);

  const hasSubmission = (problemId) => {
    if (Array.isArray(userSubmission)) {
      return userSubmission.some(submission => submission.problem_id === problemId);
    }
    return false;
  };
  
  return (
    <Grid container className="d-flex justify-content-center">
      <Grid item xs={11} md={11} lg={11}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th width='5%'>
                <Typography variant="h6" style={{padding:'10px 0px', margin:'0 0.5rem'}}>Submission</Typography>
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
                <tr key={prob.problem_id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={hasSubmission(prob.problem_id)}
                      readOnly
                    />
                  </td>
                  <td>
                    <Link style={{textDecoration:'none',color:'black'}}
                    to={`/problems/:${prob.problem_id}`}
                    className="d-flex align-items-center"
                  >
                      <Typography variant="subtitle1" style={{padding:'10px 0px', margin:'0 0.5rem'}}>{index +1 }. {prob.title}</Typography>
                      </Link>
                    </td>
                 
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
