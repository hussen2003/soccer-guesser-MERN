import React from 'react';
import Header from '../components/header/Header.js';
import './aboutpage.css'; // Importing CSS for styling

function AboutPage() {
    const teamMembers = [
        { name: 'David Urrego', role: 'Frontend (Web)', image: 'https://cdn.sofifa.net/players/241/721/24_120.png' },
        { name: 'Hussen Premier', role: 'Database', image: 'https://cdn.sofifa.net/players/192/448/24_120.png' },
        { name: 'Jack Gao', role: 'Frontend (Web)/(Mobile)', image: 'https://cdn.sofifa.net/players/232/411/24_120.png' },
        { name: 'Luckner Ablard', role: 'Frontend (Mobile)', image: 'https://cdn.sofifa.net/players/206/517/24_120.png' },
        { name: 'Daniel Cohen', role: 'Frontend (Web)', image: 'https://cdn.sofifa.net/players/231/443/24_120.png' },
        { name: 'Patrick Rizkalla', role: 'API', image: 'https://cdn.sofifa.net/players/264/240/24_120.png' },
        { name: 'Raul Graterol', role: 'Frontend (Mobile)', image: 'https://cdn.sofifa.net/players/252/371/24_120.png' },
        { name: 'Ryan Rahrooh', role: 'Project Manager', image: 'https://cdn.sofifa.net/players/216/352/24_120.png' }
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
                            <img src={member.image} alt={member.name} tyle={{verticalAlign: 'middle'}} />
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