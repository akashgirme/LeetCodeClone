
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';

function NavBar() {

  const { user, logout } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand ><strong className='h3'>LeetCode Clone</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
              <Nav.Link className="p-2"><Link to="/" >Home</Link></Nav.Link>
              <Nav.Link className="p-2" ><Link to="/problems">Problems</Link></Nav.Link>

          </Nav>
          <Nav>
          <div className='d-flex justify-content-end'>
              <Nav.Link>
              {user ? (
                  <div className='d-flex p-0 m-0'>
                      <p className='d-flex py-3 px-2 m-0'>Welcome, {user}!</p>
                      <button className='m-0 align-items-center' varient="secondary" onClick={logout}>Logout</button>
                  </div>
                )   : (
                <Link to="/login">
                  <Button varient="primary">Login</Button>
                </Link>
              )}   
              </Nav.Link>
              </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;