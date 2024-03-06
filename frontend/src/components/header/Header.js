import React from 'react';
import "./header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from'react-bootstrap/Nav';

const Header = () => {
  return (
  <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand>
        <Nav.Link href="/">SOCCERDLE 123</Nav.Link>
      </Navbar.Brand>
    </Navbar>
  </div>
  )
}

export default Header