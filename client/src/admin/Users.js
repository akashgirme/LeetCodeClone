import React, { useState, useEffect } from "react";
import { Table, Col, Row, Container } from "react-bootstrap";
import AdminPanel from "./AdminPanel";
import { backendUrl } from "../Components/constants";

function Users() {
  const [users, setUsers] = useState();
  const [user_id, setUser_id] = useState();
  const [error, setError] = useState();

  const DeleteUser = async () => {
    try {
      const response = await fetch(`${backendUrl}/deleteUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user_id: user_id,
        }),
      });
      if (response.ok) {
        setUser_id(""); // Reset the input field
        setError("User deleted successfully");
        // Reload the problem list
        fetchUsers();
        // Clear the error message after a certain delay (e.g., 3000 milliseconds)
        setTimeout(() => setError(""), 2000);
      } else {
        const data = await response.json();
        setError(data.msg);
        // Clear the error message after a certain delay (e.g., 3000 milliseconds)
        setTimeout(() => setError(""), 2000);
      }

      const data = await response.json();
      setError(data.msg);
      fetchUsers();
    } catch (error) {
      console.error("Error while Problem Adding:", error);
    }
  };

  const fetchUsers = () => {
    // Fetch data from the server when the component mounts
    fetch(`${backendUrl}/api/user`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Initial load of the problem list
    fetchUsers();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md sm lg="4">
          <AdminPanel />
          <h5>{error}</h5>
          <h5>Delete User</h5>
          <div className="subform">
            <label htmlFor="delete">Enter User_Id to delete User</label>
            <input
              onChange={(e) => {
                setUser_id(e.target.value);
              }}
              type="number"
              name="user_id"
              placeholder="Enter User Id"
            />
          </div>
          <button type="submit" onClick={DeleteUser}>
            Delete User
          </button>
        </Col>
        <Col>
          <div>
            <Col className="md-6 lg-6">
              <div className="d-flex justify-content-center">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th width="5%">ID</th>
                      <th width="55%">Email/Username</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users && users.length > 0 ? (
                      users.map((user, index) => (
                        <tr>
                          <td>{user.user_id}</td>
                          <td>{user.email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No Users available.</td>
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
  );
}

export default Users;
