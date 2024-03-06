import React from 'react';
import "./header.css";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const aboutus = (event) => {
  event.preventDefault();
  window.location.href = "/AboutPage";
}
function handleMouseEnter(event) {
  event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
}
function handleMouseLeave(event) {
  event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
}

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand>
          Soccer Guesser
          {window.location.pathname == "/" && (<Button onClick={aboutus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'absolute', top: '15px', right: '20px', padding: '10px', backgroundColor: '#efeee9', color: '#000', border: 'none', cursor: 'pointer' }}>
            About Us
          </Button>)}
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Header