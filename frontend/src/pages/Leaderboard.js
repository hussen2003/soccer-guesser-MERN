import Header from '../components/header/Header.js';
import React, { useState, useEffect } from 'react';

// will be used for displaying leaderboard
function Leaderboard() {
    const [message, setMessage] = useState("");
    const [players, setPlayers] = useState([]);
    const goback = async (event) => {
        event.preventDefault();
        setMessage("success?");
        window.location.href = "/LandingPage";
    }
    function handleMouseEnter(event) {
        event.target.style.backgroundColor = '#3dea76';
    }
    function handleMouseLeave(event) {
        event.target.style.backgroundColor = '#efeee9';
    }
    useEffect(() => {
        async function grabdata() {
            try {
                const response = await fetch("http://localhost:5001/api/daily/leaderboard", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error('Failed to obtain leaderboard data!');
                }
                const ar1 = await response.json();
                setPlayers(ar1);
            } catch (e) {
                alert(e.toString());
                setMessage("Error occurred. Please try again later!");
                return;
            }
        }
        grabdata();
    }, []);
    return (
        <div>
            <Header />
            <div className='Leaderboard'></div>
            <button onClick={goback}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'absolute', top: '140px', left: '15%', padding: '10px', backgroundColor: '#efeee9', color: '#000', border: 'none', cursor: 'pointer' }}>
                Home
            </button>
            <div style={{ margin: '30px 0' }}></div> { }
            <h1>Top Players</h1>
            <div style={{ margin: '30px 0' }}></div> { }
            <div style={{
                width: '75%',
                border: '2px solid #000',
                padding: '10px',
                margin: '0 auto',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #000' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>No.</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Name</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Score</span>
                </div>
                {players
                    .filter(player => player.score > 0)
                    .map((player, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            borderTop: '1px solid #000'
                        }}>
                            <span>{index + 1}</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {index < 3 && <span style={{ marginRight: '10px' }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>} { }
                                <span>{player.name}</span>
                            </div>
                            <span>{player.score}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Leaderboard;