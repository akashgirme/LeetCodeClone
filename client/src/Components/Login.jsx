import React from 'react'
import { Container } from 'react-bootstrap'
import {useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { backendUrl} from './constants';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  return (
    <div id="login">
      <Container fluid className='d-flex mt-5 flex-column align-items-center'>
      <h1>Login</h1>
      <div>
        <div className='subform'>
          <label htmlFor="email">Email: </label>
          <input onChange={(e) => {
            setEmail(e.target.value)
          }} type="text" name='email' placeholder='Your Email' />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name='password' placeholder='Your Password' />
        </div>

       <button type="submit" id="test" onClick={async (e) => {
            try {
              // Perform the login logic (e.g., make an API request)
                  const response = await fetch(`${backendUrl}/login`, {
                      method: "POST",
                      
                      headers: {
                        "Content-Type": "application/json",
                      },

                      body: JSON.stringify({
                        email: email,
                        password: password,
                      }),
                  });
        
                  if (response.ok) {
                    const data = await response.json();
                    const token = data.token;
                    localStorage.setItem('email', email);
                    login(email, token); // Set the user and token upon successful login
                    setError(null); // Clear any previous errors
                    navigate("/");
                  } else {
                    setError("Invalid email or password");
                  }

            } catch (error) {
              console.error("Login error:", error);
              setError("An error occurred. Please try again later.");
            }

        }}>Login</button>
        <p>{error}</p>
      </div>
      <Link to="/signup"><h6>Don't have account! Register</h6></Link>
      </Container>

    </div>
  )
}

export default Login ;