import Header from "../components/header/Header.js";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import './dailypage.css';

const app_name = "soccerdle-mern-ace81d4f14ec";
function buildPath(route) {
  if (process.env.NODE_ENV === "production") {
    return "https://" + app_name + ".herokuapp.com/" + route;
  } else {
    return "http://localhost:5001/" + route;
  }
}

function DailyPage() {
  const [message, setMessage] = useState("");
  const [dailyPlayer, setDailyPlayer] = useState(null);
  var pToday, fToday;
  const [guess, setGuess] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [guessesMade, setGuessesMade] = useState([]);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [hint, setHint] = useState("");
  const [hintdex, setHindex] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [gameSummary, setGameSummary] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildPath("api/players/getDailyPlayer"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to obtain daily player data!");
        }
        const data = JSON.parse(await response.text());
        setDailyPlayer(data);
      } catch (e) {
        alert(e.toString());
        setMessage("Error occurred. Please try again later!");
        return;
      }
      var obj = { username: JSON.parse(localStorage.getItem('user_data')).username };
      var js = JSON.stringify(obj);
      try {
        const res = await fetch(buildPath("api/daily/getGuesses"), {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Failed to obtain daily player data!");
        }
        const guessdata = JSON.parse(await res.text());
        pToday = guessdata.playedToday;
        fToday = guessdata.finishedToday;
        if (!pToday) {
          var object = { username: JSON.parse(localStorage.getItem('user_data')).username, guess: null, tryAmount: 0 };
          var js = JSON.stringify(object);
          try {
            const response2 = await fetch(buildPath("api/daily/updateGuess"), {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
            if (!response2.ok) {
              throw new Error("Failed to obtain daily player data!");
            }
          } catch (e) {
            alert(e.toString());
            setMessage("Error occurred. Please try again later!");
            return;
          }
        } else if (pToday && !fToday) {
          const updatedGuessesMade = (guessdata.guesses || []).filter(guess => guess.trim() !== '');
          const updatedCurrentGuessIndex = updatedGuessesMade.length;
          const updatedHintdex = guessdata.hints;
          setGuessesMade(updatedGuessesMade);
          setCurrentGuessIndex(updatedCurrentGuessIndex);
          setHindex(updatedHintdex);
        } else if (fToday) {
          const updatedGuessesMade = (guessdata.guesses || []).filter(guess => guess.trim() !== '');
          const updatedCurrentGuessIndex = updatedGuessesMade.length;
          const updatedHintdex = guessdata.hints;
          setGuessesMade(updatedGuessesMade);
          setCurrentGuessIndex(updatedCurrentGuessIndex);
          setHindex(updatedHintdex);
          setGameEnded(true);
          try {
            const responseEnd = await fetch(buildPath("api/daily/endGame"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username: JSON.parse(localStorage.getItem('user_data')).username, score: 0, tryAmount: updatedGuessesMade.length + 1 }),
            });
            if (!responseEnd.ok) {
              throw new Error("Failed to fetch game summary stats!");
            }
            const data = JSON.parse(await responseEnd.text());
            setGameSummary(data);
            setShowModal(true);
          } catch (error) {
            alert(error.toString());
            setMessage("Error occurred. Please try again later!");
            return;
          }
        }
      } catch (e) {
        alert(e.toString());
        setMessage("Error occurred. Please try again later!");
        return;
      }
    };

    fetchData();
  }, []);

  const updateHintdex = async (i) => {
    var obj = { username: JSON.parse(localStorage.getItem('user_data')).username, dex: i};
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath("api/daily/updateHints"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update hints!");
      }
      const data = JSON.parse(await response.text());
      const updateHintdex = data.hints;
      setHindex(updateHintdex);
    } catch (e) {
      alert(e.toString());
      setMessage("Error occurred. Please try again later!");
      return;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  };

  const goback = async (event) => {
    event.preventDefault();
    window.location.href = "/LandingPage";
  }

  function handleMouseEnter(event) {
    event.target.style.backgroundColor = '#3dea76';
  }

  function handleMouseLeave(event) {
    event.target.style.backgroundColor = '#efeee9';
  }

  const updateGuess = async (input) => {
    var obj = { username: JSON.parse(localStorage.getItem('user_data')).username, guess: input.trim(), tryAmount: guessesMade.length + 1 };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath("api/daily/updateGuess"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update guess!");
      }
    } catch (e) {
      alert(e.toString());
      setMessage("Error occurred. Please try again later!");
      return;
    }
  }

  const checkGuess = () => {
    // Check if guess is not empty string
    if (guess.trim() === "") {
      return; // Do nothing if guess is empty
    }

    updateGuess(guess.trim());
    const currentGuess = guess.trim().toLowerCase();
    const correctNameLower = dailyPlayer.name.toLowerCase();
    const isCorrectGuess = currentGuess === correctNameLower;

    const updatedGuessesMade = [...guessesMade];
    updatedGuessesMade[currentGuessIndex] = guess;
    setGuessesMade(updatedGuessesMade);

    if (isCorrectGuess || currentGuessIndex === 5) {
      setGameEnded(true);
      let s = 0;
      if (isCorrectGuess) {
        switch (currentGuessIndex) {
          case 0:
            s = 100;
            break;
          case 1:
            s = 90;
            break;
          case 2:
            s = 75;
            break;
          case 3:
            s = 60;
            break;
          case 4:
            s = 45;
            break;
          case 5:
            s = 30;
            break;
          default:
            s = 0;
            break;
        }
        if(hintdex[0])
          s -= 1;
        if(hintdex[1])
          s -= 3;
        if(hintdex[2])
          s -= 3;
        if(hintdex[3])
          s -= 3;
        if(hintdex[4])
          s -= 5;
        Score(s);
        handleGameEnd(s, guessesMade.length + 1);
      } else {
        Score(0);
        handleGameEnd(s, 7);
      }
    } else {
      setCurrentGuessIndex(currentGuessIndex + 1);
      setGuess("");
    }
  };

  const revealHint = (index) => {
    const updatedHintdex = [...hintdex];
    updatedHintdex[index] = true; // Marking the index of the hint as true to indicate it has been revealed
    setHindex(updatedHintdex); // Update the hintdex state
    updateHintdex(index);
    switch (index) {
      case 0:
        setHint(`Nationality: ${dailyPlayer.nationality}`);
        break;
      case 1:
        setHint(`Age: ${dailyPlayer.age}`);
        break;
      case 2:
        setHint(`League: ${dailyPlayer.league}`);
        break;
      case 3:
        setHint(`Club: ${dailyPlayer.club}`);
        break;
      case 4:
        setHint(`Position: ${dailyPlayer.positions}`);
        break;
      default:
        setHint("");
    }
  };

  const getHint = (index) => {
    switch (index) {
      case 0:
        return `Nationality: ${dailyPlayer.nationality}`;
      case 1:
        return `Age: ${dailyPlayer.age}`;
      case 2:
        return `League: ${dailyPlayer.league}`;
      case 3:
        return `Club: ${dailyPlayer.club}`;
      case 4:
        return `Position: ${dailyPlayer.positions}`;
      default:
        return "";
    }
  };

  const Score = async (input) => {
    var obj = { username: JSON.parse(localStorage.getItem('user_data')).username, dailyScore: input };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath("api/daily/updateScore"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update score!");
      }
    } catch (e) {
      alert(e.toString());
      setMessage("Error occurred. Please try again later!");
      return;
    }
  }

  const handleGameEnd = async (scores, tries) => {
    try {
      const responseEnd = await fetch(buildPath("api/daily/endGame"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: JSON.parse(localStorage.getItem('user_data')).username, score: scores, tryAmount: tries }),
      });
      if (!responseEnd.ok) {
        throw new Error("Failed to fetch game summary stats!");
      }
      const data = JSON.parse(await responseEnd.text());
      setGameSummary(data);
      setShowModal(true);
    } catch (error) {
      alert(error.toString());
      setMessage("Error occurred. Please try again later!");
      return;
    }
  };

  const close = async (event) => {
    event.preventDefault();
    setShowModal(false);
  }

  const open = async (event) => {
    event.preventDefault();
    setShowModal(true);
  }

  return (
    <div>
      <Header />
      {!gameEnded && (<Button onClick={goback}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          top: ".3vw",
          left: "-17.5vw", padding: '10px', backgroundColor: '#efeee9', color: '#000', cursor: 'pointer', border: '2px solid #000000', minWidth: '6vw'
        }}>
        Home
      </Button>)}
      <div
        style={{
          minHeight: "75vh",
          minWidth: "75vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Change background color to white with some opacity
          borderRadius: "10px", // Add some border radius for the container
          backdropFilter: "blur(5px)", // Add a blur effect for better blending with the background image
        }}
      >
        <span style={{ width: "100%", alignContent: "center" }}>
          <div>
            {guessesMade.map((guess, index) => (
              <span
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "5px auto",
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "10vh",
                }}
              >
                <p
                  style={{ fontSize: "20px", color: "black", margin: "0" }}
                >{`Guess ${index + 1}: ${guessesMade[index]}`}</p>
                {index >= 0 && !hintdex[index] && !gameEnded && (
                  <span>
                    <button
                      onClick={() => {
                        revealHint(index);
                      }}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        backgroundColor: "#007bff",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Show Hint
                    </button>
                  </span>
                )}
                {hintdex[index] && (
                  <span
                    style={{
                      margin: "10px auto",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    {getHint(index)}{" "}
                    {index === 0 && (
                      <img src={dailyPlayer.country_flag} alt="Country Flag" />
                    )}
                    {index === 3 && (
                      <img src={dailyPlayer.club_logo} alt="club logo" />
                    )}
                  </span>
                )}
              </span>
            ))}
          </div>
          {!gameEnded && (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "5px auto",
                width: "50%",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
            >
              <p style={{ margin: "0" }}>{`Guess ${guessesMade.length + 1
                }:`}</p>
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={15}
                autoFocus
              />
            </div>
          )}
          {gameEnded && (
            <div
              style={{
                margin: "10px auto",
                width: "50%",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              {guess.trim().toLowerCase() === dailyPlayer.name.trim().toLowerCase() ? (
                <p style={{ margin: "0" }}>{`You guessed it in ${guessesMade.length
                  } ${guessesMade.length === 1 ? "try!" : "tries!"}`}</p>
              ) : (
                <p
                  style={{ margin: "0" }}
                >{`The player was ${dailyPlayer.name}`}</p>
              )}
              <span>
                <img
                  src={dailyPlayer.image}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <span>
                  <img
                    src={dailyPlayer.club_logo}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </span>
              </span>
            </div>
          )}
          {gameEnded && (
            <div>
              <span>
                <Button onClick={open}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ padding: '10px', backgroundColor: '#efeee9', color: '#000', cursor: 'pointer', border: '2px solid #000000', minWidth: '6vw' }}>
                  Stats
                </Button>
                {' '}
                <Button onClick={goback}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ padding: '10px', backgroundColor: '#efeee9', color: '#000', cursor: 'pointer', border: '2px solid #000000', minWidth: '6vw' }}>
                  Home
                </Button>
              </span>
            </div>
          )}
        </span>
      </div>
      {gameEnded && showModal && (<div className={`modal-overlay ${showModal ? 'visible' : ''}`}>
        <div className={`modal-content ${showModal ? 'visible' : ''}`}>
          {/* Your modal content */}
          <h2>Game Summary</h2>
          <p>Streak: {gameSummary.streak}</p>
          <p>Win Rate: {gameSummary.winRate.toFixed(2)}%</p>
          <p>Score for Today: {gameSummary.score}</p>
          <p>All Time Score: {gameSummary.allTimeScore}</p>
          <h3>Guess Distribution</h3>
          <ul>
            {gameSummary.guessDistribution.map((count, index) => (
              <li key={index}>{index + 1} : {count}</li>
            ))}
          </ul>
          <button onClick={close}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ padding: '5px', backgroundColor: '#efeee9', color: '#000', cursor: 'pointer', border: '2px solid #000000', position: 'relative', maxWidth: '12vw' }}
          >Close</button>
        </div>
      </div>)}
    </div>
  );
}

export default DailyPage;
