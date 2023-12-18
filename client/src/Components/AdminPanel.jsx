import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";

function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("admin-token"),
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("admin-token");
    // Update the authentication state
    setAuthenticated(false);
  };

  if (!authenticated) {
    navigate("/admin/login");
  }

  return (
    <div>
      <Container>
        {authenticated ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
            <ul>
              <li>
                <Link to="/admin/problem">Delete Problem</Link>
              </li>
              <li>
                <Link to="/admin/user">Delete User</Link>
              </li>
              <li>
                <Link to="/admin/deleteAdmin">Add or Remove Admin User</Link>
              </li>
              <li>
                <Link to="/admin/problemWithTestCases">
                  Add Problem With TestCases
                </Link>
              </li>
              <li>
                <Link to="/admin/addsolution">Add Solution for Problem</Link>
              </li>
              <li>
                <Link to="/admin/testcases">Add & Delete Testcases</Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/admin/login">
            <h5>Login as admin</h5>
          </Link>
        )}
      </Container>
    </div>
  );
}

export default AdminPanel;
