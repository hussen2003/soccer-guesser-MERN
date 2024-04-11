import Header from '../components/header/Header.js';
import './unlimitedmode.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const app_name = 'soccerdle-mern-ace81d4f14ec';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5001/' + route;
  }
}

// unlimited mode page
function UnlimitedMode() {
  const [message, setMessage] = useState('');
  const initialState = {
    guess: '',
    gameEnded: false,
    guessesMade: [],
    currentGuessIndex: 0,
    hint: '',
    hintdex: Array(5).fill(false),
    dailyPlayer: null,
  };

  const [gameState, setGameState] = useState(initialState);

  useEffect(() => {
    // Fetch new player data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(buildPath('api/players/getRandomPlayer'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Failed to obtain random player data!');
        }
        const data = JSON.parse(await response.text());
        setGameState((prevState) => ({ ...prevState, dailyPlayer: data }));
      } catch (e) {
        alert(e.toString());
        setMessage('Error occurred. Please try again later!');
        return;
      }
    };

    fetchData();

    setGameState(initialState);
  }, []);

  const goback = async (event) => {
    event.preventDefault();
    window.location.href = '/LandingPage';
  };

  function handleMouseEnter(event) {
    event.target.style.backgroundColor = '#3dea76';
  }

  function handleMouseLeave(event) {
    event.target.style.backgroundColor = '#efeee9';
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkGuess();
    }
  };

  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const checkGuess = () => {
    const { guess, guessesMade, currentGuessIndex, gameEnded, dailyPlayer } = gameState;
    if (guess.trim() === '') {
      return;
    }
    const trimmedGuess = gameState.guess.trim().toLowerCase();
    const correctNameLower = gameState.dailyPlayer.name.toLowerCase();
    const isCorrectGuess = trimmedGuess === correctNameLower;

    const updatedGuessesMade = [...guessesMade];
    updatedGuessesMade[currentGuessIndex] = guess;

    const updatedGameState = {
      ...gameState,
      guessesMade: updatedGuessesMade,
      guess: '',
    };

    if (isCorrectGuess || currentGuessIndex === 5) {
      updatedGameState.gameEnded = true;
    } else {
      updatedGameState.currentGuessIndex = currentGuessIndex + 1;
    }
    if (!isCorrectGuess) {
      setWrongGuesses([...wrongGuesses, currentGuessIndex]);
      setTimeout(() => setWrongGuesses(wrongGuesses.filter((index) => index !== currentGuessIndex)), 2000);
    } else {
      setCorrectGuesses([...correctGuesses, currentGuessIndex]);
    }

    setGameState(updatedGameState);
  };

  const revealHint = (index) => {
    const { hintdex, dailyPlayer } = gameState;
    const updatedHintdex = [...hintdex];
    updatedHintdex[index] = true;

    let hint = '';
    switch (index) {
      case 0:
        hint = `Nationality: ${dailyPlayer.nationality}`;
        break;
      case 1:
        hint = `Age: ${dailyPlayer.age}`;
        break;
      case 2:
        hint = `League: ${dailyPlayer.league}`;
        break;
      case 3:
        hint = `Club: ${dailyPlayer.club}`;
        break;
      case 4:
        hint = `Position: ${dailyPlayer.positions}`;
        break;
      default:
        hint = '';
    }

    setGameState((prevState) => ({
      ...prevState,
      hintdex: updatedHintdex,
      hint: hint,
    }));
  };

  const getHint = (index) => {
    const { dailyPlayer } = gameState;
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
        return '';
    }
  };

  return (
    <div>
      <Header />
      <div style={{ margin: '50px' }} />

      <div
        style={{
          minHeight: '75vh',
          minWidth: '45vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'rgba(33, 37, 41, 0.87)',
          borderRadius: '10px',
          backdropFilter: 'blur(1px)',
          color: 'white',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Unlimited Mode</h1>
        <div style={{ margin: '5px 0' }}></div>
        <span style={{ width: '100%', alignContent: 'center' }}>
          <div>
            {gameState.currentGuessIndex === 0 && (<p style={{ fontSize: '20px', color: 'white', margin: '0', paddingBottom: '15px' }}>To start, guess a soccer player below!</p>)}
            {gameState.guessesMade.map((guess, index) => (
              <span
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: correctGuesses.includes(index) ? '2px solid green' : wrongGuesses.includes(index) ? '2px solid red' : '1px solid #ccc',
                  padding: '10px',
                  margin: '5px auto',
                  width: '80%',
                  backgroundColor: 'rgba(85, 85, 85, 0.6)',
                  borderRadius: '5px',
                  height: '9vh',
                  color: 'white',
                  animation: wrongGuesses.includes(index) ? 'shake 0.5s' : 'none',
                }}
              >
                <p style={{ fontSize: '20px', color: 'white', margin: '0' }}>{`Guess ${index + 1}: ${guess}`}</p>
                {index >= 0 && !gameState.hintdex[index] && !gameState.gameEnded && (
                  <span>
                    <button onClick={() => revealHint(index)} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
                      Show Hint
                    </button>
                  </span>
                )}
                {gameState.hintdex[index] && (
                  <span style={{ margin: '10px auto', backgroundColor: 'rgba(85, 85, 85,0)', borderRadius: '5px', padding: '10px' }}>
                    {getHint(index)} {index === 0 && <img src={gameState.dailyPlayer.country_flag} alt="Country Flag" />}
                    {index === 3 && <img src={gameState.dailyPlayer.club_logo} alt="club logo" style={{ maxWidth: '100%', height: '6vh' }} />}
                  </span>
                )}
              </span>
            ))}
          </div>
          {!gameState.gameEnded && (
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px auto', width: '50%', backgroundColor: 'rgba(85, 85, 85, 0.6)', borderRadius: '5px' }}>
              <p style={{ margin: '0' }}>{`Guess ${gameState.guessesMade.length + 1}:`}</p>
              <input
                type="text"
                style={{
                  color: 'white',
                  margin: '0',
                  backgroundColor: 'rgba(85, 85, 85, 0.9)',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRradius: '5px',
                  paddingLeft: '10px',
                  width: 'calc(100% - 20px)',
                }}
                value={gameState.guess}
                onChange={(e) => setGameState({ ...gameState, guess: e.target.value })}
                onKeyPress={handleKeyPress}
                maxLength={16}
                autoFocus
              />
            </div>
          )}
          {gameState.gameEnded && (
            <div style={{ margin: '10px auto', width: '50%', backgroundColor: 'rgba(85, 85, 85, 0.6)', borderRadius: '5px', padding: '10px' }}>
              {gameState.guess.trim().toLowerCase() === gameState.dailyPlayer.name.trim().toLowerCase() ? (
                <p style={{ margin: '0' }}>{`You guessed it in ${gameState.guessesMade.length} ${gameState.guessesMade.length === 1 ? 'try!' : 'tries!'}`}</p>
              ) : (
                <p style={{ margin: '0' }}>{`The player was ${gameState.dailyPlayer.name}`}</p>
              )}
              <span>
                <img src={gameState.dailyPlayer.image} style={{ maxWidth: '100%', height: '128px' }} />
                <span>
                  <img src={gameState.dailyPlayer.club_logo} style={{ maxWidth: '100%/', height: '64px' }} />
                </span>
              </span>
            </div>
          )}
          {gameState.gameEnded && (
            <span>
              <Button
                onClick={() => window.location.reload()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '10px', backgroundColor: '#efeee9', color: '#000', cursor: 'pointer', border: '2px solid #000000', minWidth: '6vw' }}
              >
                Play Again
              </Button>{' '}
              <Button
                onClick={goback}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '10px', backgroundColor: '#efeee9', color: '#000', cursor: 'pointer', border: '2px solid #000000', minWidth: '6vw' }}
              >
                Home
              </Button>
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

export default UnlimitedMode;
