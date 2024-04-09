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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Header />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Row style={{
          backgroundColor: 'rgba(33, 37, 41, 0.87)',
          borderRadius: '10px',
          backdropFilter: 'blur(1px)',
          minWidth: '90vw',
          minHeight: '70vh',
          margin: 'auto',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          color: 'white',
        }}>
          <Col>
            <Card className="bg-dark text-white" style={{ width: '350px', height: '500px', margin: 'auto', marginTop: '60px', padding: '10px 0'}}>
              <Card.Img variant="top" src={messi2} />
              <Card.Body style={{display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Card.Title>Daily Game</Card.Title>
                <Card.Text>Every 24 hours a new player will be randomly selected. Can you guess today's player?</Card.Text>
                <Button variant="success" onClick={playdaily} style={{marginTop: '5px'}}>
                  Play now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col >
            <Card className="bg-dark text-white" style={{ width: '350px', height: '500px', margin: 'auto', marginTop: '60px', padding: '10px 0' }}>
              <Card.Img variant="top" src={SUI} />
              <Card.Body style={{display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Card.Title>Unlimited Game</Card.Title>
                <Card.Text>Test your knowledge and go as many times as you want! How many can you guess?</Card.Text>
                <Button variant="success" onClick={goUnlimited} style={{marginTop: '5px'}}>
                  Play now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col >
            <Card className="bg-dark text-white" style={{ width: '350px', height: '500px', margin: 'auto', marginTop: '60px', padding: '10px 0' }}>
              <Card.Img variant="top" src={france2} />
              <Card.Body style={{display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Card.Title>Daily Leaderboard</Card.Title>
                <Card.Text>Leaderboard for the Daily game mode.</Card.Text>
                <Button variant="success" onClick={goleaderboard} style={{marginTop: '5px'}}>
                  Leaderboard
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="bg-dark text-white" style={{ width: '350px', height: '500px', margin: 'auto', marginTop: '60px', padding: '10px 0' }}>
              <Card.Img variant="top" src={brazil2} />
              <Card.Body style={{display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Card.Title>All Time Leaderboard</Card.Title>
                <Card.Text>Overall Leaderboard. Do you see yourself on it?</Card.Text>
                <Button variant="success" onClick={goAllTime} style={{marginTop: '5px'}}>
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
