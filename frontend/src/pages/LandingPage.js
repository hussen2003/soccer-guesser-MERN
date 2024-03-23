import Header from '../components/header/Header.js';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function LandingPage() {
    const name = (JSON.parse(localStorage.getItem('user_data')).name);
    const [message, setMessage] = useState("");
    const playdaily = (event) => {
        event.preventDefault();
        setMessage("success?");
        window.location.href = "/DailyPage";
    }
    const goleaderboard = (event) => {
        event.preventDefault();
        setMessage("success?");
        window.location.href = "/Leaderboard";
    }
    const logout = (event) => {
        event.preventDefault();
        setMessage("success?");
        window.location.href = "/";
    }
    const goUnlimited = (event) => {
        event.preventDefault();
        setMessage("success?");
        window.location.href = "/UnlimitedMode";
    }
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
            <div className='landing-page' style={{
                position: 'relative',
                minWidth: '40vw',
                margin: 'auto',
                padding: '60px',
                backgroundColor: 'rgba(224, 224, 224, .9)',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{ color: 'Black' }}> Hello, {name}!</h1>
                <div style={{ margin: '75px 0' }}></div> { }
                <Button onClick={playdaily}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '25px', width: '225px', height: '80px', cursor: 'pointer' }}>
                    Play Daily Game
                </Button>
                <div style={{ margin: '20px 0' }}></div> { }
                <Button onClick={goUnlimited}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '25px', width: '225px', height: '80px', cursor: 'pointer' }}>
                    Unlimited Mode
                </Button>
                <div style={{ margin: '20px 0' }}></div> { }
                <Button onClick={goleaderboard}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ padding: '20px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '30px', width: '225px', height: '80px', cursor: 'pointer' }}>
                    LeaderBoard
                </Button>
                <div style={{ margin: '80px 0' }}></div> { }
                <Button onClick={logout}
                    onMouseEnter={handleMouseEnterlog}
                    onMouseLeave={handleMouseLeave}
                    style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '30px', width: '225px', height: '80px', cursor: 'pointer' }}>
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default LandingPage;