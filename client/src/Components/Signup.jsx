import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { backendUrl } from "./constants";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div id='signup' className='flex-col'>
      <Container fluid className='d-flex mt-5 flex-column align-items-center'>
      <h1>Signup</h1>
      <div className='signup-form'>
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

        <div className='subform'>
          <label htmlFor='password'>Confirm Password: </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            name='ConfirmPassword'
            placeholder='confirm Password'
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type='submit'
          id='test'
          onClick={async (e) => {

          /*  if(password !== confirmPassword){
              setError("Password and Confirm Password do not match");
              return;
            }  */

            const response = await fetch(`${backendUrl}/signup`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });

            const json = await response.json();
            console.log(json);
  
            // Reset the form after Respone
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setError("");

          }}
        >
          SIGNUP
        </button>
      </div>
      <Link to="/login"><h6>Already have an account! Login here </h6></Link>
      </Container>
    </div>
  );
};

export default Signup;


