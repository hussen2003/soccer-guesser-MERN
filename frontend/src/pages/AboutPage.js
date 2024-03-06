import React from 'react';
import Header from '../components/header/Header.js';
import './aboutpage.css'; // Importing CSS for styling
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AboutPage() {
    const teamMembers = [
        { name: 'David Urrego', role: 'Frontend (Web)' },
        { name: 'Hussen Premier', role: 'Database' },
        { name: 'Jack Gao', role: 'Frontend' },
        { name: 'Luckner Ablard', role: 'Frontend (Mobile)' },
        { name: 'Moses Daniel Cohen', role: 'Frontend (Web)' },
        { name: 'Patrick Rizkalla', role: 'API' },
        { name: 'Raul Graterol', role: 'Frontend (Mobile)' },
        { name: 'Ryan Rahrooh', role: 'Project Manager' }
    ];

    function handleMouseEnter(event) {
        event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
    }
    function handleMouseLeave(event) {
        event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
    }

    const goHome = () => {
        window.location.href = "/"; // Navigate to the home page
    };

    return (
        <div>
            <Header />
            <div className='about-page'>
                <h1>About Us</h1>
                <div className="team-members">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="member">
                            <h2>{member.name}</h2>
                            <p>{member.role}</p>
                            {/* Below is a bootstrap component that would look cool to put everyone's name, role, and button redirecting to LinkedIn profile */}
                            {/* <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="/soccerBall.jpeg" />
                                <Card.Body>
                                    <Card.Title><h2>{member.name}</h2></Card.Title>
                                        <Card.Text>
                                        <p>{member.role}</p>
                                        </Card.Text>
                                    <Button variant="primary">LinkedIn</Button>
                                </Card.Body>
                            </Card> */}
                        </div>
                    ))}
                </div>
                <button onClick={goHome}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="home-button">
                    Home
                </button>
            </div>
        </div>
    );
}

export default AboutPage;