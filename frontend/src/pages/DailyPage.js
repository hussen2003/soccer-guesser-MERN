import Header from '../components/header/Header.js';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

// will work on this later, this is for playing the daily game
function DailyPage() {
    const [message, setMessage] = useState("");
    const [dailyPlayer, setDailyPlayer] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/players/getDailyPlayer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error('Failed to obtain daily player data!');
                }
                const data = JSON.parse(await response.text());
                setDailyPlayer(data);
            } catch (e) {
                alert(e.toString());
                setMessage("Error occurred. Please try again later!");
                return;
            }
        }
        fetchData();
    }, []);

    const guesses = ['Guess 1', 'Guess 2', 'Guess 3', 'Guess 4', 'Guess 5', 'Guess 6'];
    const [guess, setGuess] = useState('');
    const [gameEnded, setGameEnded] = useState(false);
    const [guessesMade, setGuessesMade] = useState([]);
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
    const [showHintButton, setShowHintButton] = useState(false);
    const [hint, setHint] = useState('');
    const [hintdex, setHindex] = useState(Array(5).fill(false));
    const updateHintAtIndex = (index, value) => {
        setHindex(prevHintdex => {
            const updatedHintdex = [...prevHintdex];
            updatedHintdex[index] = value;
            return updatedHintdex;
        });
    };

    if (!dailyPlayer) return null;

    var correctName = dailyPlayer.name;
    var nationality = dailyPlayer.nationality;
    var age = dailyPlayer.age;
    var club = dailyPlayer.club;
    var league = dailyPlayer.league;
    var position = dailyPlayer.position;

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    };

    const checkGuess = () => {
        // Check if guess is not empty string
        if (guess.trim() === "") {
            return; // Do nothing if guess is empty
        }

        const currentGuess = guess.toLowerCase();
        const correctNameLower = correctName.toLowerCase();
        const isCorrectGuess = currentGuess === correctNameLower;

        const updatedGuessesMade = [...guessesMade];
        updatedGuessesMade[currentGuessIndex] = guess;
        setGuessesMade(updatedGuessesMade);

        if (isCorrectGuess || currentGuessIndex === 5) {
            setGameEnded(true);
        } else {
            setCurrentGuessIndex(currentGuessIndex + 1);
            setGuess('');
        }
    };

    const revealHint = () => {
        const updatedHintdex = [...hintdex];
        updatedHintdex[currentGuessIndex - 1] = true; // Marking the index of the hint as true to indicate it has been revealed
        setHindex(updatedHintdex); // Update the hintdex state
        switch (currentGuessIndex) {
            case 2:
                setHint(`Nationality: ${nationality}`);
                break;
            case 3:
                setHint(`Age: ${age}`);
                break;
            case 4:
                setHint(`Club: ${club}`);
                break;
            case 5:
                setHint(`League: ${league}`);
                break;
            case 6:
                setHint(`Position: ${position}`);
                break;
            default:
                setHint('');
        }
        setShowHintButton(false); // Hide the hint button after revealing the hint
    };

    const getHint = (index) => {
        switch (index) {
            case 1:
                return `Nationality: ${nationality}`;
            case 2:
                return `Age: ${age}`;
            case 3:
                return `Club: ${club}`;
            case 4:
                return `League: ${league}`;
            case 5:
                return `Position: ${position}`;
            default:
                return '';
        }
    };

    return (
        <div>
            <Header />
            <div style={{
                minHeight: '75vh',
                minWidth: '75vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Change background color to white with some opacity
                borderRadius: '10px', // Add some border radius for the container
                backdropFilter: 'blur(5px)' // Add a blur effect for better blending with the background image
            }}>
                <span style={{ width: '100%', alignContent: 'center' }}>
                    <div>
                        {guessesMade.map((guess, index) => (
                            <span key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', padding: '10px', margin: '5px auto', width: '75%', backgroundColor: 'white', borderRadius: '5px' }}>
                                <p style={{ fontSize: '15px', color: 'black', margin: '0' }}>{`Guess ${index + 1}: ${guess}`}</p>
                                {index >= 0 && !gameEnded && (
                                    <span>
                                        <button onClick={() => revealHint(index)} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Show Hint</button>
                                        {hintdex[index - 1] && <span style={{ margin: '10px auto', backgroundColor: 'white', borderRadius: '5px', padding: '10px' }}>{getHint(index)}</span>}
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                    {!gameEnded && (
                        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px auto', width: '50%', backgroundColor: 'white', borderRadius: '5px' }}>
                            <p style={{ margin: '0' }}>{`Guess ${guessesMade.length + 1}:`}</p>
                            <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyPress={handleKeyPress} maxLength={15} autoFocus />
                        </div>
                    )}
                    {gameEnded && (
                        <div style={{ margin: '10px auto', width: '50%', backgroundColor: 'white', borderRadius: '5px', padding: '10px' }}>
                            {guess.toLowerCase() === correctName.toLowerCase() ? (
                                <p style={{ margin: '0' }}>{`You guessed it in ${guessesMade.length} tries`}</p>
                            ) : (
                                <p style={{ margin: '0' }}>{`The player was ${correctName}`}</p>
                            )}
                        </div>
                    )}
                </span>

            </div>
        </div>
    );
}

export default DailyPage;