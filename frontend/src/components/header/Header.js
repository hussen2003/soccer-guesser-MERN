import React from 'react';
import "./header.css";
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
  <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand>
        Soccer Guesser  
      </Navbar.Brand>  
    </Navbar>
  </div>
  )
}

export default Header