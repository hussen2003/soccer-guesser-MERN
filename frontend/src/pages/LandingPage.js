import Header from '../components/header/Header.js';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SUI from '../images/SUI.jpeg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import brazil2 from '../images/brazil2.jpeg';
import messi2 from '../images/messi2.jpeg';
import france2 from '../images/france2.jpeg';

function LandingPage() {
  const name = JSON.parse(sessionStorage.getItem('user_data')).name;
  const [message, setMessage] = useState('');
  const playdaily = (event) => {
    event.preventDefault();
    setMessage('success?');
    window.location.href = '/DailyPage';
  };
  const goleaderboard = (event) => {
    event.preventDefault();
    setMessage('success?');
    window.location.href = '/Leaderboard';
  };
  const logout = (event) => {
    event.preventDefault();
    setMessage('success?');
    window.location.href = '/';
  };
  const goUnlimited = (event) => {
    event.preventDefault();
    setMessage('success?');
    window.location.href = '/UnlimitedMode';
  };
  const goAllTime = (event) => {
    event.preventDefault();
    setMessage('success?');
    window.location.href = '/AllTimeLB';
  };
  function handleMouseEnter(event) {
    event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
  }
  function handleMouseLeave(event) {
    event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
  }
  function handleMouseEnterlog(event) {
    event.target.style.backgroundColor = '#ff5555';
  }
  return (
    <div
      style={{
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Header />
      <div
        style={{
          padding: '20px',
          backgroundColor: 'rgba(33, 37, 41, 0.87)', // Change background color to white with some opacity
          borderRadius: '10px', // Add some border radius for the container
          backdropFilter: 'blur(1px)', // Add a blur effect for better blending with the background image
          //position: 'relative',
          minWidth: '90vw',
          minHeight: '40vh',
          margin: 'auto',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          color: 'white',
          //marginLeft: '-75px'
        }}
      >
        <Row className="g-4 ">
          <Col>
            <Card className="bg-dark text-white" style={{ width: '300px', height: '400px' }}>
              <Card.Img variant="top" src={messi2} />
              <Card.Body>
                <Card.Title>Daily Game</Card.Title>
                <Card.Text>Every 24 hours a new player will be randomly selected. Can you guess today's player?</Card.Text>
                <Button variant="success" onClick={playdaily}>
                  Play now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="bg-dark text-white" style={{ width: '300px', height: '400px' }}>
              <Card.Img variant="top" src={SUI} />
              <Card.Body>
                <Card.Title>Unlimited Game</Card.Title>
                <Card.Text>Test your knowledge and go as many times as you want! How many can you guess?</Card.Text>
                <Button variant="success" onClick={goUnlimited}>
                  Play now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="bg-dark text-white" style={{ width: '300px', height: '400px' }}>
              <Card.Img variant="top" src={france2} />
              <Card.Body>
                <Card.Title>Daily Leaderboard</Card.Title>
                <Card.Text>Leaderboard for the Daily game mode.</Card.Text>
                <Button variant="success" onClick={goleaderboard} style={{ marginTop: '5.5vh' }}>
                  Leaderboard
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="bg-dark text-white" style={{ width: '300px', height: '400px' }}>
              <Card.Img variant="top" src={brazil2} />
              <Card.Body>
                <Card.Title>All Time Leaderboard</Card.Title>
                <Card.Text>Overall Leaderboard. Do you see yourself on it?</Card.Text>
                <Button variant="success" onClick={goAllTime} style={{ marginTop: '5vh' }}>
                  All Time
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LandingPage;
