import React from 'react'
import { Table , Container} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import {backendUrl} from './constants'

function ProblemList() {
    const [problems, setProblems] = useState([]);
  
    useEffect(() => {
      // Fetch data from the server when the component mounts
      fetch(`${backendUrl}/problems`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => setProblems(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);


  return (
    <div className="d-flex justify-content-center">
      <Container>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th width="5%">ID</th>
          <th width="55%">Title</th>
          <th width="20%">Solution</th>
          <th width="20%">Difficulty</th>
        </tr>
      </thead>
     
      <tbody>
      {problems && problems.length > 0 ? (
        problems.map((prob, index) => (
              <tr>
                <td>{prob.problemid}</td>
                <Link to={`/problems/:${prob.problemid}`} className="d-flex align-items-center">
                  <td>{prob.title}</td>
                </Link>
                <td>Solution Link</td>
                <td className={`${prob.difficulty}`} >{prob.difficulty}</td>
              </tr>
            ))) : (
              <tr>
                <td colSpan="5">No problems available.</td>
              </tr>
            )}
      </tbody>
    </Table>
    </Container>
    </div>
  )
}

export default ProblemList
