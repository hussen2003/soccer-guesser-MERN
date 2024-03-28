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

  <Navbar expand="lg" fixed="top">
      <Navbar.Brand>
        {/* still need to add the logic for clicking the navbar (if signed in, take to landing on click. otherwise, take to login on click) */}
        <Nav.Link href="/">SOCCERDLE</Nav.Link>      
      </Navbar.Brand>
  </Navbar>
    
  </div>
  )
}

export default Header