import Header from '../components/header/Header.js';
import React, { useState, useEffect } from 'react';

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

    const [guess, setGuess] = useState('');
    const [gameEnded, setGameEnded] = useState(false);
    const [guessesMade, setGuessesMade] = useState([]);
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
    const [hint, setHint] = useState('');
    const [hintdex, setHindex] = useState(Array(5).fill(false));

    if (!dailyPlayer) return null;

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

        const currentGuess = guess.trim().toLowerCase();
        const correctNameLower = dailyPlayer.name.toLowerCase();
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

    const revealHint = (index) => {
        const updatedHintdex = [...hintdex];
        updatedHintdex[index] = true; // Marking the index of the hint as true to indicate it has been revealed
        setHindex(updatedHintdex); // Update the hintdex state
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
                setHint('');
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
                            <span key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', padding: '10px', margin: '5px auto', width: '80%', backgroundColor: 'white', borderRadius: '5px', height: '10vh' }}>
                                <p style={{ fontSize: '20px', color: 'black', margin: '0' }}>{`Guess ${index + 1}: ${guess}`}</p>
                                {index >= 0 && !hintdex[index] && !gameEnded && (
                                    <span>
                                        <button onClick={() => revealHint(index)} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Show Hint</button>
                                    </span>
                                )}
                                {hintdex[index] && (
                                    <span style={{ margin: '10px auto', backgroundColor: 'white', borderRadius: '5px', padding: '10px' }}>{getHint(index)}{' '} 
                                    {index === 0 && <img src={dailyPlayer.country_flag} alt="Country Flag" />} 
                                    {index === 3 && <img src={dailyPlayer.club_logo} alt="club logo"/>}
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
                            {guess.toLowerCase() === dailyPlayer.name.toLowerCase() ? (
                                <p style={{ margin: '0' }}>{`You guessed it in ${guessesMade.length} ${guessesMade.length === 1 ? 'try!' : 'tries!'}`}</p>
                            ) : (
                                <p style={{ margin: '0' }}>{`The player was ${dailyPlayer.name}`}</p>
                            )}
                            <span>
                                <img src={dailyPlayer.image} style={{ maxWidth: '100%', height: 'auto' }} />
                                <span><img src={dailyPlayer.club_logo} style={{ maxWidth: '100%/', height: 'auto'}} /></span>
                            </span>
                        </div>
                    )}
                </span>
            </div>
        </div>

    );
}

export default DailyPage;