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
    function handleMouseEnter(event) {
        event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
    }
    function handleMouseLeave(event) {
        event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
    }
    function handleMouseEnterlog(event) {
        event.target.style.backgroundColor = '#ff0000';
    }
    return (
        <div>
            <Header />
            <div className='landing-page'></div>
            <h1> Hello, {name}!</h1>
            <div style={{ margin: '75px 0' }}></div> { }
            <Button onClick = {playdaily}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '20px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '25px', width: '225px', height: '80px', cursor: 'pointer' }}>
                Play Daily Game
            </Button>
            <div style={{ margin: '20px 0' }}></div> { }
            <Button onClick={goleaderboard}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '20px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '30px', width: '225px', height: '80px', cursor: 'pointer' }}>
                LeaderBoard
            </Button>
            <div style={{ margin: '100px 0' }}></div> { }
            <Button onClick={logout}
                onMouseEnter={handleMouseEnterlog}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '15px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '30px', width: '225px', height: '80px', cursor: 'pointer' }}>
                Logout
            </Button>
        </div>
    );
}

export default LandingPage;