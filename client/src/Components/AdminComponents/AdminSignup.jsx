import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { backendUrl } from "../constants";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const adminSignup= async () => {

    /*  if(password !== confirmPassword){
        setError("Password and Confirm Password do not match");
        return;
      }  */

      const response = await fetch(`${backendUrl}/admin-signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          name:name,
          email: email,
          password: password,
        }),
      });

      if(response.ok){
          const json = await response.json();
        console.log(json);

        // Reset the form after Respone
        setName("");
        setEmail("");
        setPassword("");
        setError("");
      

      }
      
    }

  return (
    <div id='signup' className='flex-col'>
      <Container>
      <h1>Admin Signup</h1>
      <div className='signup-form'>

      <div className='subform'>
          <label htmlFor='password'>Name </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type='text'
            name='Name'
            placeholder='Enter Name'
          />
        </div>

        <div className='subform'>
          <label htmlFor='email'>Email: </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type='text'
            name='email'
            placeholder='Your Email'
          />
        </div>

        <div className='subform'>
          <label htmlFor='password'>Password: </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            placeholder='Your Password'
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type='submit'
          id='test'
          onClick={adminSignup}>
          SIGNUP
        </button>
       { error ? ( <p>{error}</p>) :<></> }
      </div>
      <Link to="/admin/login"><h6>Already have an account! Login here </h6></Link>
      </Container>
    </div>
  );
};

export default AdminSignup;

