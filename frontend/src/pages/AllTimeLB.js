import Header from "../components/header/Header.js";
import React, { useState, useEffect } from "react";
import BirdsEyeViewSoccerField from "../components/login/BirdsEyeViewSoccerField.jpg";

const app_name = "soccerdle-mern-ace81d4f14ec";
function buildPath(route) {
  if (process.env.NODE_ENV === "production") {
    return "https://" + app_name + ".herokuapp.com/" + route;
  } else {
    return "http://localhost:5001/" + route;
  }
}

// will be used for displaying leaderboard
function AllTimeLB() {
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState([]);
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
        const response = await fetch(buildPath("api/unlimited/leaderboard"), {
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
    <div
      style={{
        position: 'relative',
        minWidth: '40vw',
        minHeight: '80vh',
        margin: 'auto',
        backgroundColor: 'rgba(33, 37, 41, .9)',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        color: 'white',
      }}
    >
      <Header />
      <div
        className="Leaderboard"
        style={{
          width: '100%',
          margin: '15px auto',
          // backgroundColor: "rgba(0, 150, 0, .5)", // Adjust transparency here
          padding: '20px',
          borderRadius: '1px', // Optional: Add border radius for better appearance
          // boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Optional: Add shadow for better contrast
          backdropFilter: 'blur(1px)',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Top Players</h1>
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
            .filter((player) => player.score > 0)
            .map((player, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderTop: '1px solid rgba(114,114,114)',
                }}
              >
                <span>{index + 1}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {index < 3 && <span style={{ marginRight: '10px' }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>}
                  <span>{player.name}</span>
                </div>
                <span>{player.score}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllTimeLB;
