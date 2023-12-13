import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { backendUrl } from "./constants";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {

      if(password !== confirmPassword){
        setError("Password and Confirm Password do not match");
        return;
      } 

      const response = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();
      console.log(json);

      // Reset The Form After Operation
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");

    }

  return (
      <Grid container display='flex' alignItems='center' justifyContent='center'>
        <Grid item xs={10} md={5} lg={5} mt='3rem' display='flex' flexDirection='column' alignItems='center'>
        <Typography variant='h4'>Signup</Typography>
        <Stack spacing={2} mt='1rem' direction='column' alignItems='center'>
            <TextField variant='outlined' label='Enter Email' sx={{width:'100%'}}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField variant='outlined' label='Enter Password' type='password' sx={{width:'100%'}}
              onChange={(e) => setPassword(e.target.value)}
            />
       
            <TextField variant='outlined' label='Confirm Password' type='password' sx={{width:'100%'}}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

           <p>{error}</p>

          <Button variant='contained' sx={{width:'90%'}}
            onClick={handleSignup}
          >
            SIGNUP
          </Button>
        <Link to="/login"><Typography variant='h6'>Already have an account! Login here </Typography></Link>
        </Stack>
      </Grid>
      </Grid>
  );
};

export default Signup;


