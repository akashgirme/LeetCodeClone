import React from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { backendUrl } from "./constants";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (email == "" || password == "") {
      setError("Email or Password Should not be empty");
      return;
    }
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
        localStorage.setItem("email", email);
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
  };

  return (
    <div id="login">
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={11}
          md={5}
          lg={5}
          mt="4rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4">Login</Typography>
          <Stack direction="column" spacing={2} mt="1rem" alignItems="center">
            <TextField
              label="Enter Email"
              variant="outlined"
              size="large"
              sx={{ width: "100%" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <TextField
              label="Enter Password"
              variant="outlined"
              type="password"
              sx={{ width: "100%" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              sx={{ width: "90%" }}
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>

            <p>{error}</p>
            <Link to="/signup">
              <Typography variant="h6">Don't have account! Register</Typography>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
