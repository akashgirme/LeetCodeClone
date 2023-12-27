import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { backendUrl } from "../Components/constants";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Make a POST request to your server for admin authentication
    try {
      const response = await fetch(`${backendUrl}/api/admin/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.adminJwtToken;
        localStorage.setItem("adminJwtToken", token);
        localStorage.setItem("adminEmail", email);
        setError(null); // Clear any previous errors
        navigate("/admin");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Container fluid className="d-flex mt-5 flex-column align-items-center">
        <h2>Admin Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {error && error.length > 0 ? (
          <p className="error-message">{error}</p>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
}

export default AdminLogin;
