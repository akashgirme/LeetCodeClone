import React, { useCallback } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { backendUrl } from "./constants";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [userSubmission, setUserSubmission] = useState([]);
  const [sort, setSort] = useState(0); // 0 for Default, 10 for Easy to Hard, 20 for Hard to Easy

  const token = localStorage.getItem("jwtToken");

  const difficultyOrder = useMemo(() => {
    return {
      Easy: 1,
      Medium: 2,
      Hard: 3,
      Expert: 4,
    };
  }, []);

  const fetchSubmissionForUser = useCallback(() => {
    fetch(`${backendUrl}/api/submit/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserSubmission(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [token]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/problem`);
        const data = await response.json();

        let sortedProblems;
        if (sort === 10) {
          sortedProblems = data.sort(
            (a, b) =>
              difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
          );
        } else if (sort === 20) {
          sortedProblems = data.sort(
            (a, b) =>
              difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty],
          );
        } else {
          sortedProblems = data.sort((a, b) => a.problem_id - b.problem_id);
        }

        setProblems(sortedProblems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      fetchSubmissionForUser();
    };

    fetchProblems();
  }, [sort, difficultyOrder, fetchSubmissionForUser]);

  const hasSubmission = (problemId) => {
    if (Array.isArray(userSubmission)) {
      return userSubmission.some(
        (submission) => submission.problem_id === problemId,
      );
    }
    return false;
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Grid
      container
      sm
      md
      lg
      xl="11"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Grid item display="flex" alignItems="center" justifyContent="flex-start">
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Sort Problems</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort by Difficulty"
            onChange={handleChange}
          >
            <MenuItem value={0}>Default</MenuItem>
            <MenuItem value={10}>Easy to Hard</MenuItem>
            <MenuItem value={20}>Hard to Easy</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Table
          striped
          bordered
          hover
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <thead>
            <tr>
              <th width="5%">
                <Typography
                  variant="h6"
                  style={{ padding: "10px 0px", margin: "0 0.5rem" }}
                >
                  Submission
                </Typography>
              </th>
              <th width="60%">
                <Typography
                  variant="h6"
                  style={{ padding: "10px 0px", margin: "0 0.5rem" }}
                >
                  Title
                </Typography>
              </th>
              <th width="25%">
                <Typography
                  variant="h6"
                  style={{ padding: "10px 0px", margin: "0 0.5rem" }}
                >
                  Difficulty
                </Typography>
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
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/problems/:${prob.problem_id}`}
                      className="d-flex align-items-center"
                    >
                      <Typography
                        variant="subtitle1"
                        style={{ padding: "10px 0px", margin: "0 0.5rem" }}
                      >
                        {index + 1}. {prob.title}
                      </Typography>
                    </Link>
                  </td>

                  <td>
                    <Typography
                      variant="subtitle1"
                      style={{ padding: "10px 0px", margin: "0 0.5rem" }}
                    >
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
