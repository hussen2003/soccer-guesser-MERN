import React from 'react';
import Header from '../components/header/Header.js';
import './aboutpage.css'; // Importing CSS for styling

function AboutPage() {
    const teamMembers = [
        { name: 'David Urrego', role: 'Frontend (Web)', image: 'https://cdn.sofifa.net/players/241/721/24_120.png', linkedin: 'https://www.linkedin.com/in/david-urrego/'},
        { name: 'Hussen Premier', role: 'Database', image: 'https://cdn.sofifa.net/players/192/448/24_120.png', linkedin: 'https://www.linkedin.com/in/hussen-premier/'},
        { name: 'Jack Gao', role: 'Frontend (Web)/(Mobile)', image: 'https://cdn.sofifa.net/players/232/411/24_120.png', linkedin: 'https://www.linkedin.com/in/jack-gao-376328290'},
        { name: 'Luckner Ablard', role: 'Frontend (Mobile)', image: 'https://cdn.sofifa.net/players/206/517/24_120.png', linkedin: 'https://www.linkedin.com/in/luckner-ablard/'},
        { name: 'Daniel Cohen', role: 'Frontend (Web)', image: 'https://cdn.sofifa.net/players/231/443/24_120.png', linkedin: 'https://www.linkedin.com/in/moses-cohen/'},
        { name: 'Patrick Rizkalla', role: 'API', image: 'https://cdn.sofifa.net/players/264/240/24_120.png', linkedin: 'https://www.linkedin.com/in/patrick-rizkalla/'},
        { name: 'Raul Graterol', role: 'Frontend (Mobile)', image: 'https://cdn.sofifa.net/players/252/371/24_120.png', linkedin: 'https://www.linkedin.com/in/raul-graterol-509716241'},
        { name: 'Ryan Rahrooh', role: 'Project Manager', image: 'https://cdn.sofifa.net/players/216/352/24_120.png', linkedin: 'https://www.linkedin.com/in/ryan-rahrooh'}
    ];

    function handleMouseEnter(event) {
        event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
    }
    function handleMouseLeave(event) {
        event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
    }

    const handleMouseEnter1 = (event) => {
        event.target.style.transform = 'translateY(-2px)'; // Move the box 5 pixels up on hover
    };

    const handleMouseLeave1 = (event) => {
        event.target.style.transform = 'translateY(0)'; // Move the box back to its original position when not hovered

    };
    const goHome = () => {
        window.location.href = "/"; // Navigate to the home page
    };

    const redirectToLinkedIn = (linkedinUrl) => {
        window.open(linkedinUrl, '_blank'); // Open LinkedIn profile in a new tab
    };

    return (
        <div>
            <Header />
            <div className='about-page'>
                <h1>About Us</h1>
                <div className="team-members">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="member" onClick={() => redirectToLinkedIn(member.linkedin)} onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
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