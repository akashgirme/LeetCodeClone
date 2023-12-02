import React, { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import AdminPanel from '../AdminPanel';
import AddTestCase from './AddTestCase';
import { backendUrl } from '../constants';

function TestCase() {
  const [testcaseid, setTestCaseId] = useState('');
  const [error, setError] = useState('');
  const [TestCases, setTestCases]=useState();
  


  const deleteTestCase = async () => {
    try {
      const response = await fetch(`${backendUrl}/deleteTestCase`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testcaseid: testcaseid,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setError(data.msg);
        setTestCaseId('');
        fetchTestCases();
        setTimeout(() => setError(''), 2000);
      } else {
        const data = await response.json();
        setError(data.msg);
        setTimeout(() => setError(''), 2000);
      }
    } catch (error) {
      console.error('Error while deleting test case:', error);
    }
  };


  const fetchTestCases = () => {
    // Fetch data from the server when the component mounts
    fetch(`${backendUrl}/testcases`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.problemid - b.problemid);
        setTestCases(data)
      })
      .catch((error) => console.error('Error fetching data:', error));

  }

    useEffect(() => {
  // Initial load of the problem list
        fetchTestCases();
    }, []);

  return (
    <div className='mx-3 mt-5'>
        <Row>
            <Col md sm lg="6">
              <Container>
                <Row><AdminPanel/></Row>
                <Row><AddTestCase/></Row>
                <Row>
                <div>
                    <h5>{error}</h5>
                    <h2>Delete Test Case</h2>
                    <div className='subform'>
                        <label htmlFor="delete">Enter Test Case ID to delete Test Case</label>
                        <input
                        onChange={(e) => setTestCaseId(e.target.value)}
                        type='number'
                        name='testCaseId'
                        placeholder='Enter Test Case ID'
                        />
                    </div>
                    <button type='submit' onClick={deleteTestCase}>
                        Delete Test Case
                    </button>
                    </div>
                </Row>
              </Container>
            </Col>
            <Col className='me-3'>
            <div className="d-flexjustify-content-center">
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th width="5%">Problem ID</th>
                    <th width="55%">Test Case Id</th>
                    <th>Test Input</th>
                    <th>Expected Output</th>
                    </tr>
                </thead>
                
                <tbody>
                {TestCases && TestCases.length > 0 ? (
                    TestCases.map((Case, index) => (
                        <tr>
                            <td>{Case.problemid}</td>
                            <td>{Case.testcaseid}</td>
                            <td><pre>{Case.input}</pre></td> {/* <pre> tag is used to preserve text fromatting</pre> */}
                            <td><pre>{Case.Expectedoutput}</pre></td>
                        </tr>
                        ))) : (
                        <tr>
                            <td colSpan="5">No Test Cases available.</td>
                        </tr>
                        )}
                </tbody>
                </Table>
                </div>
            </Col>
        </Row>
    </div>
    
  );
}

export default TestCase;
