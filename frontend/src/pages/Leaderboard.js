import Header from '../components/header/Header.js';
import React, { useState } from 'react';

// will be used for displaying leaderboard
function Leaderboard(){
    const [message, setMessage] = useState("");
    const goback = async (event) => {
        event.preventDefault();
        setMessage("success?");
        window.location.href = "/LandingPage";
    }
    function handleMouseEnter(event) {
        event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
    }
    function handleMouseLeave(event) {
        event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
    }
    return(
        <div>
            <Header />
            <div className = 'Leaderboard'></div>
            <button onClick = {goback}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style = {{position: 'fixed', top: '100pt', left: '200pt', padding: '10px', backgroundColor: '#efeee9', color: '#000', border: 'none', cursor: 'pointer',}}>
            Home
            </button>
            <div style={{ margin: '30px 0' }}></div> {}
            <h1>Top Players</h1>

        </div>
    );
}

export default Leaderboard;