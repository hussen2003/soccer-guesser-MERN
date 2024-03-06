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
                const data = await response.json();
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
    const [guessesMade, setGuessesMade] = useState(Array(0));
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

    const correctName = dailyPlayer ? dailyPlayer.name : null;
    if (!correctName) return null;

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    };

    const checkGuess = () => {
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

    return (
        <div>
            <Header />
            {guessesMade.map((guess, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '5px', margin: '5px auto', width: '30%' }}>
                    <p>{`Guess ${index + 1}: ${guess}`}</p>
                </div>
            ))}
            {!gameEnded && (
                <div style={{ border: '1px solid #ccc', padding: '5px', margin: '5px auto', width: '30%' }}>
                    <p>{`Guess ${guessesMade.length + 1}:`}</p>
                    <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyPress={handleKeyPress} maxLength={15} autoFocus />
                </div>
            )}
            {gameEnded && (
                <div style={{ margin: '10px auto', width: '40%' }}>
                    {guess.toLowerCase() == correctName.toLowerCase() ? (
                        <p>{`You guessed it in ${guessesMade.length} tries`}</p>
                    ) : (
                        <p>{`The player was ${correctName}`}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default DailyPage;