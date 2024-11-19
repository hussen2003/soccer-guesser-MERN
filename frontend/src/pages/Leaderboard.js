import Header from "../components/header/Header.js";
import React, { useState, useEffect } from "react";
import BirdsEyeViewSoccerField from "../components/login/wallpaper3.jpg";
import Wallpaper3 from "../components/login/wallpaper3.jpg";

const app_name = "sd-group1-7db20f01361c";
function buildPath(route) {
  if (process.env.NODE_ENV === "production") {
    return "https://" + app_name + ".herokuapp.com/" + route;
  } else {
    return "http://localhost:5001/" + route;
  }
}

// will be used for displaying leaderboard
function Leaderboard() {
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState([]);
  const curUser = JSON.parse(sessionStorage.getItem('user_data')).name;
  const goback = async (event) => {
    event.preventDefault();
    setMessage("success?");
    window.location.href = "/LandingPage";
  };
  function handleMouseEnter(event) {
    event.target.style.backgroundColor = "#3dea76";
  }
  function handleMouseLeave(event) {
    event.target.style.backgroundColor = "#efeee9";
  }
  useEffect(() => {
    async function grabdata() {
      try {
        const response = await fetch(buildPath("api/daily/leaderboard"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to obtain leaderboard data!");
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
      <div
        className="Leaderboard"
        style={{
          minHeight: '80vh',
          width: '80%',
          display: 'inline-block',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'rgba(33, 37, 41, 0.87)',
          borderRadius: '10px',
          backdropFilter: 'blur(1px)',
          color: 'white',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Daily Top Players</h1>
        <div style={{ margin: '20px 0' }}></div>
        <div
          style={{
            width: '100%',
            border: '2px solid rgba(114,114,114)',
            padding: '5px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid rgba(114,114,114)',
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>No.</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Name</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Score</span>
          </div>
          {players
            .filter((player) => player.dailyScore > 0)
            .map((player, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  borderTop: '1px solid rgba(114,114,114)',
                  backgroundColor: player.name === curUser ? 'rgba(0, 150, 0, 0.3)' : 'transparent',
                }}
              >
                <span>{index + 1}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {index < 3 && <span style={{ marginRight: '10px' }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>}
                  <span>{player.name}</span>
                </div>
                <span>{player.dailyScore}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
