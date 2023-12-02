import React, { useState, useEffect } from 'react'
import { Table , Col, Row, Container} from 'react-bootstrap';
import AdminPanel from '../AdminPanel';
import AdminSignup from './AdminSignup';
import { backendUrl } from '../constants';

function Users() {
    const[admin, setAdmin] = useState();
    const[adminId, setAdminId] = useState();
    const [error, setError] = useState();

  
      const DeleteAdmin = async() => {
        try {
            const response = await fetch(`${backendUrl}/deleteAdmin`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({
                  adminId:adminId,
                }),
            });
            
            if(response.ok){
              setAdminId(''); // Reset the input field
              setError('Admin deleted successfully');
            // Reload the problem list
              fetchAdmins();
            // Clear the error message after a certain delay (e.g., 3000 milliseconds)
              setTimeout(() => setError(''), 2000);
            }
            else{
              const data = await response.json();
              setError(data.msg);
             // Clear the error message after a certain delay (e.g., 3000 milliseconds)
              setTimeout(() => setError(''), 2000);
            }

        } catch (error) {
            console.error("Error while Problem Adding:", error);
            
      }
    }

    const fetchAdmins = () => {
      // Fetch data from the server when the component mounts
      fetch(`${backendUrl}/admins`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => setAdmin(data))
        .catch((error) => console.error('Error fetching data:', error));

    }

  useEffect(() => {
    // Initial load of the problem list
    fetchAdmins();
  }, []);

  

  return (
    <Container className='mt-5'>
      <Row>
        <Col md sm lg="4">
          <AdminPanel/>
          <AdminSignup/>
          <h5>{error}</h5>
          <h5>Delete Admin</h5>
                    <div className='subform'>
                        <label htmlFor="delete">Enter AdminId to delete Admin</label>
                        <input onChange={(e) => {
                            setAdminId(e.target.value)
                        }} type="number" name='adminId' placeholder='Enter AdminId' />
                    </div>
                    <button type="submit" onClick={DeleteAdmin}>Delete Admin</button>
      </Col>
      <Col>
      <div>
      <Col className="md-6 lg-6">
          <div className="d-flex justify-content-center">
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th width="5%">ID</th>
                    <th>Name</th>
                    <th width="55%">Email/Username</th>
                    </tr>
                </thead>
                
                <tbody>
                {admin && admin.length > 0 ? (
                    admin.map((ad, index) => (
                        <tr>
                            <td>{ad.adminId}</td>
                            <td>{ad.name}</td>
                            <td>{ad.email}</td>
                        </tr>
                        ))) : (
                        <tr>
                            <td colSpan="5">No Admin available.</td>
                        </tr>
                        )}
                </tbody>
                </Table>
                </div>
      </Col>
      
    </div>
      </Col>
      </Row>
    </Container>
    
  )
}

export default Users
