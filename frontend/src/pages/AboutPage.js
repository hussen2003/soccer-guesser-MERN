import React from 'react';
import './aboutpage.css'; // Importing CSS for styling

function AboutPage() {
    const teamMembers = [
        { name: 'David Urrego', role: 'Frontend (Web)', image: 'https://cdn.sofifa.net/players/241/721/24_120.png' },
        { name: 'Hussen Premier', role: 'Database', image: 'https://cdn.sofifa.net/players/192/448/24_120.png' },
        { name: 'Jack Gao', role: 'Frontend (Web)/(Mobile)', image: 'https://cdn.sofifa.net/players/232/411/24_120.png' },
        { name: 'Luckner Ablard', role: 'Frontend (Mobile)', image: 'https://cdn.sofifa.net/players/206/517/24_120.png' },
        { name: 'Moses Cohen', role: 'Frontend (Web)', image: 'https://cdn.sofifa.net/players/231/443/24_120.png' },
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
            <div className='about-page'>
                <h1 class="about-title">About Us</h1>
                <div className="team-members">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="member">
                            <h2>{member.name}</h2>
                            <p>{member.role}</p>
                            <img src={member.image} alt={member.name} tyle={{verticalAlign: 'middle'}} />
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