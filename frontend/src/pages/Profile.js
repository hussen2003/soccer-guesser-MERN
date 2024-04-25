import Header from '../components/header/Header.js';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const app_name = 'soccerdle-mern-ace81d4f14ec';
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    } else {
        return 'http://localhost:5001/' + route;
    }
}

function Profile() {
    const [message, setMessage] = useState('');
    const [newName, setNewName] = useState(JSON.parse(sessionStorage.getItem('user_data')).name);
    const [newUser, setNewUser] = useState(JSON.parse(sessionStorage.getItem('user_data')).username);
    const [score, setScore] = useState(0);
    const [dScore, setDScore] = useState(0);
    const [GP, setGP] = useState(0);
    const [GW, setGW] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {

        async function grabUser() {
            try {
                const username = JSON.parse(sessionStorage.getItem('user_data')).username;
                const response = await fetch(buildPath("api/auth/obtainUser"), {
                    method: 'POST',
                    body: JSON.stringify({ username }), // Pass username as JSON string
                    headers: { 'Content-Type': 'application/json' },
                });
                const res = await response.json(); // Parse response as JSON

                if (res.error) {
                    setMessage(res.error);
                } else {
                    // Access the correct properties from the response
                    setDScore(res.user.dailyScore);
                    setScore(res.user.score);
                    setGP(res.user.amountGamesPlayed);
                    setGW(res.user.amountGamesWon);
                    setStreak(res.user.streak);
                }
            } catch (error) {
                setMessage('Internal Server Error');
                console.error('Error fetching user data:', error);
            }
        }


        grabUser();
    }, [message]);

    const changeName = async (event) => {
        event.preventDefault();
        var obj = { newName: newName, username: JSON.parse(sessionStorage.getItem('user_data')).username };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/auth/updateName'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' },
            });
            var res = JSON.parse(await response.text());
            if (res.error) {
                setMessage(res.error);
            } else {
                setMessage(res.message);
                setNewName(res.newName); // Update newName state with the new name
                const userData = JSON.parse(sessionStorage.getItem('user_data'));
                sessionStorage.setItem('user_data', JSON.stringify({ ...userData, name: res.newName }));
                window.location.href = '/Profile';
            }
        } catch (e) {
            setMessage('Internal Server Error');
            return;
        }
    }

    const changeUsername = async (event) => {
        event.preventDefault();
        var obj = { newUsername: newUser, username: JSON.parse(sessionStorage.getItem('user_data')).username };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/auth/updateUsername'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' },
            });
            var res = JSON.parse(await response.text());
            if (res.error) {
                setMessage(res.error);
            } else {
                setMessage(res.message);
                setNewUser(res.newUser);
                const userData = JSON.parse(sessionStorage.getItem('user_data'));
                sessionStorage.setItem('user_data', JSON.stringify({ ...userData, username: res.newUser }));
                window.location.href = '/Profile';
            }
        } catch (e) {
            setMessage('Internal Server Error');
            return;
        }
    }

    const deleteUser = async (event) => {
        // event.preventDefault();
        var obj = { username: JSON.parse(sessionStorage.getItem('user_data')).username };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/auth/deleteUser'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' },
            });
            var res = JSON.parse(await response.text());
            if (res.error === 'Internal Server Error') {
                setMessage(res.error);
                return;
            } else {
                setMessage(res.error);
                window.location.href = '/';
            }
        } catch (e) {
            setMessage('Internal Server Error');
            return;
        }
    }

    const handleDeleteClick = () => {
        // Show confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            // If user confirms, proceed with delete operation
            deleteUser();
        }
    };

    return (
        <div>
            <Header />
            <div style={{ 
                minHeight: '75vh',
                minWidth: '45vw',
                // width: '60px',
                display: 'inline-block',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: 'rgba(33, 37, 41, 0.87)',
                borderRadius: '10px',
                backdropFilter: 'blur(1px)',
                color: 'white',
            }}>
                <h1>Hello {JSON.parse(sessionStorage.getItem('user_data')).name}!</h1>
                <div style={{ margin: '30px 0' }}></div>

                <h2>Your Stats:</h2>
                <div style={{ margin: '30px 0' }}></div>
                <p>Daily Score: {dScore}</p>
                <p>All Time Score: {score}</p>
                <p>Games Played: {GP}</p>
                <p>Games Won: {GW}</p>
                <p>Streak: {streak}</p>
                <div style={{ margin: '30px 0' }}></div>
                <div>
                    <form onSubmit={changeName} style={{ marginBottom: '20px', display: 'inline-block' }}>
                        <label style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle', width: '100px', textAlign: 'right' }}>
                            Name:
                        </label>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} style={{ 
                            marginRight: '10px' , 
                            height: '40px', 
                            padding: '10px',
                            backgroundColor: 'rgba(85, 85, 85, 0.6)',
                            borderRadius: '5px',
                            color: 'white'}} />
                        <Button variant="success" type="submit" style={{ verticalAlign: 'top', width: '200px', height: '40px' }}>Update Name</Button>
                    </form>
                </div>
                <div>
                    <form onSubmit={changeUsername} style={{ marginBottom: '20px', display: 'inline-block' }}>
                        <label style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle', width: '100px', textAlign: 'right' }}>
                            Username:
                        </label>
                        <input type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} style={{ marginRight: '10px' , 
                            height: '40px', 
                            padding: '10px',
                            backgroundColor: 'rgba(85, 85, 85, 0.6)',
                            borderRadius: '5px',
                            color: 'white'}} />
                        <Button variant="success" type="submit" style={{ verticalAlign: 'top', width: '200px', height: '40px' }}>Update Username</Button>
                    </form>
                </div>
                <div style={{ margin: '60px 0' }}></div>
                <Button variant="danger" onClick={handleDeleteClick}>Delete Account</Button>
            </div>

        </div>
    );
}

export default Profile
