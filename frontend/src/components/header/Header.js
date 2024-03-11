import React from 'react';
import "./header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from'react-bootstrap/Nav';
import NavDropdown from'react-bootstrap/NavDropdown';
import Container from'react-bootstrap/Container';
import Button from'react-bootstrap/Button';

const Header = () => {
  const aboutus = async (event) => {
    event.preventDefault();
    window.location.href = "/AboutPage";
  }
  return (
  <div>
    {/* <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">SOCCERDLE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/AboutPage">About us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}

  <Navbar expand="lg" fixed="top">
      <Navbar.Brand>
        {/* still need to add the logic for clicking the navbar (if signed in, take to landing on click. otherwise, take to login on click) */}
        <Nav.Link href="/">SOCCERDLE</Nav.Link>      
      </Navbar.Brand>
  </Navbar>

  {/* <Button onClick = {aboutus}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#4CAF50'}
    onMouseLeave={(e) => e.target.style.backgroundColor = '#90ee90'}
    style={{ position: 'fixed', top: '15vh', right: '15vw', padding: '10px 20px', backgroundColor: '#90ee90', color: 'rgb(0, 0, 0)', fontSize: '15px', width: '150px', height: '40px', transition: 'background-color 0.3s', border: 'none'}}
>About Us</Button> */}
    
  </div>
  )
}

export default Header