import React from "react";
import { useState, useEffect } from "react";
import { Col, Row, Table, Container } from "react-bootstrap";
import AdminPanel from "./AdminPanel";
import { backendUrl } from "../Components/constants";

function Problem() {
  const [problemId, setProblemId] = useState("");
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");

  const DeleteProblem = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/problem/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          problemId: problemId,
        }),
      });

      if (response.ok) {
        
        setProblemId(""); 
        setError("Problem deleted successfully");
        
        fetchProblems();
       
        setTimeout(() => setError(""), 2000);

      } else {

        const data = await response.json();
        setError(data.msg);
       
        setTimeout(() => setError(""), 2000);
      }
    } catch (error) {
      console.error("Error while deleting Problem:", error);
    }
  };

  const fetchProblems = () => {
 
    fetch(`${backendUrl}/api/problem`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProblems(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Initial load of the problem list
    fetchProblems();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <h5>{error}</h5>
          <Col xs md-6 lg="4">
            <Row>
              <AdminPanel />
            </Row>
            <Row>
              <h5>Delete Problem</h5>
              <div className="subform">
                <label htmlFor="delete">
                  Enter Problem ID to delete Problem
                </label>
                <input
                  onChange={(e) => {
                    setProblemId(e.target.value);
                  }}
                  value={problemId}
                  type="number"
                  name="problemid"
                  placeholder="Enter Problem Id"
                />
              </div>
              <button type="submit" onClick={DeleteProblem}>
                Delete Problem
              </button>
            </Row>
          </Col>

          <Col className="overflow-auto">
            <div className="">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="5%">ID</th>
                    <th width="55%">Title</th>
                  </tr>
                </thead>

                <tbody>
                  {problems && problems.length > 0 ? (
                    problems.map((prob, index) => (
                      <tr>
                        <td>{prob.problemid}</td>
                        <td>{prob.title}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No problems available.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Problem;
