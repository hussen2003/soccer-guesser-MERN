import Header from '../components/header/Header.js';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function LandingPage() {
    const array = localStorage.getItem('user_data');
    const ar1 = array.split(",");
    var name = ar1[1];
    const ar2 = name.split(":");
    var name2 = ar2[1].replace(/"/g, '');
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
        window.location.href = "/Login";
    }
    function handleMouseEnter(event) {
        event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
    }
    function handleMouseLeave(event) {
        event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
    }
    return (
        <div>
            <Header />
            <div className='landing-page'></div>
            <h1> Hello, {name2}!</h1>
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
            <div style={{ margin: '60px 0' }}></div> { }
            <Button onClick={goleaderboard}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '20px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '40px', width: '225px', height: '80px', cursor: 'pointer' }}>
                Logout
            </Button>
        </div>
    );
}

export default LandingPage;