import React from 'react';
import "./header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from'react-bootstrap/Nav';
import Container from'react-bootstrap/Container';
import Form from'react-bootstrap/Form';
import Button from'react-bootstrap/Button';

const Header = () => {
  const name = (JSON.parse(sessionStorage.getItem('user_data')).name);
  const logout = (event) => {
    event.preventDefault();
    window.location.href = "/";
  }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand className="navbarBrand" href="/LandingPage">S O C C E R D L E</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/DailyPage">Daily</Nav.Link>
              <Nav.Link href="/UnlimitedMode">Unlimited</Nav.Link>
              <Nav.Link href="/Leaderboard">Leaderboard</Nav.Link>
              <Nav.Link href="/AllTimeLB">All Time Leaderboard</Nav.Link>
              <Nav.Link href="/AboutPage">About Us</Nav.Link>
            </Nav>
            <Nav className = "ml-auto">
            <Nav.Link style = {{ padding: '0 5px'}} href="/Profile">Profile</Nav.Link>
            </Nav>
            <Navbar.Text style={{ padding: '0 20px' }}>
              Signed in as: <a>{name}</a>
            </Navbar.Text>
            <Form className="d-flex">
              <Button onClick={logout} variant="outline-danger">Sign Out</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">
        
      </div>
    </div>
  )
}

export default Header
