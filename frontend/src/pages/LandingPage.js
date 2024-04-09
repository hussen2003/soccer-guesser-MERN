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
    <div>
      <Header />
      <div
        className="landing-page"
        style={{
          minWidth: '45vw',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'rgba(33, 37, 41, 0.87)',
          borderRadius: '10px',
          backdropFilter: 'blur(1px)',
          color: 'white',
        }}
      >
        <div style={{ margin: '160px 0' }}></div> {}
        <Row className='g-4'>
        <Col>
          <Card style={{ width: '18rem', height: '28rem' }} className="bg-dark text-white">
          <div style={{ margin: '8px 0' }}></div> {}
            <Card.Img variant="top" src={messi2} />
            <Card.Body>
              <Card.Title>Daily Game</Card.Title>
              <Card.Text>
                Every 24 hours a new player will be randomly selected. Can you guess today's player?
              </Card.Text>
              <Button variant="success" onClick={playdaily}>Play now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem', height: 'auto' }} className="bg-dark text-white">
            <Card.Img variant="top" src={SUI} />
            <Card.Body>
              <Card.Title>Unlimited Game</Card.Title>
              <Card.Text>
                Test your knowledge and go as many times as you want! How many can you guess?
              </Card.Text>
              <Button variant="success" onClick={goUnlimited}>Play now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div style={{ margin: '15px 0' }}></div> {}
      <Row>
        <Col>
          <Card style={{ width: '18rem', height: '24rem' }} className="bg-dark text-white">
            <Card.Img variant="top" src={france2} />
            <div style={{ margin: '8px 0' }}></div> {}
            <Card.Body>
              <Card.Title>Daily Leaderboard</Card.Title>
              <Card.Text>
                Leaderboard for the Daily game mode.
              </Card.Text>
              <Button variant="success" onClick={goleaderboard}>Leaderboard</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem', height: 'auto' }} className="bg-dark text-white">
            <Card.Img variant="top" src={brazil2} />
            <Card.Body>
              <Card.Title>All Time Leaderboard</Card.Title>
              <Card.Text>
                Overall Leaderboard. Do you see yourself on it?
              </Card.Text>
              <Button variant="success" onClick={goAllTime}>All Time</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
              
        
        {/* <Button
          onClick={playdaily}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '25px', width: '225px', height: '80px', cursor: 'pointer' }}
        >
          Play Daily Game
        </Button> */}
        <div style={{ margin: '20px 0' }}></div> {}
        {/* <Button
          onClick={goUnlimited}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '25px', width: '225px', height: '80px', cursor: 'pointer' }}
        >
          Unlimited Mode
        </Button>
        <div style={{ margin: '20px 0' }}></div> {}
        <Button
          onClick={goleaderboard}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '23px', width: '225px', height: '80px', cursor: 'pointer' }}
        >
          Daily LeaderBoard
        </Button>
        <div style={{ margin: '20px 0' }}></div> {}
        <Button
          onClick={goAllTime}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '20px', width: '225px', height: '80px', cursor: 'pointer' }}
        >
          All Time Leaderboard
        </Button>
        <div style={{ margin: '20px 0' }}></div> {}
        <Button
          onClick={logout}
          onMouseEnter={handleMouseEnterlog}
          onMouseLeave={handleMouseLeave}
          style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '30px', width: '225px', height: '80px', cursor: 'pointer' }}
        >
          Logout
        </Button> */}
      </div>
    </div>
  );
}

export default LandingPage;
