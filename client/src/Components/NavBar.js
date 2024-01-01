import React from "react";
import { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AuthProvider } from "./AuthContext";

function NavBar() {
  const { user, logout } = useAuth(AuthProvider);

  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  console.log(user);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <strong>
            <Typography variant="h5">LeetCode Clone</Typography>
          </strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            <Nav.Link className="p-2">
              <Link to="/">
                <Button variant="text">Home</Button>
              </Link>
            </Nav.Link>
            <Nav.Link className="p-2">
              <Link to="/problems">
                <Button variant="text">Problems</Button>
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Box className="d-flex justify-content-end">
              <Nav.Link>
                {user && user.length ? (
                  <Box className="d-flex p-0 m-0">
                    <Box className="d-flex py-3 px-2 m-0">
                      <Typography variant="body">Welcome, </Typography>
                      {user}!
                    </Box>
                    <Button
                      className="m-0 align-items-center"
                      variant="outlined"
                      size="small"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </Box>
                ) : (
                  <Link to="/login">
                    <Button variant="contained">Login</Button>
                  </Link>
                )}
              </Nav.Link>
            </Box>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
