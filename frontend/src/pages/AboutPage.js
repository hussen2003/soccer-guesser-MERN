import React from 'react';
import './aboutpage.css'; // Importing CSS for styling
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Header from '../components/header/Header.js';
import Container from 'react-bootstrap/Container'; // Import Container
import Row from 'react-bootstrap/Row'; // Import Row
import Col from 'react-bootstrap/Col'; // Import Col


function AboutPage() {
  const teamMembers = [
    { name: 'David Urrego', role: 'Frontend (Web)', image: 'https://cdn.sofifa.net/players/241/721/24_120.png', linkedin: 'https://www.linkedin.com/in/david-urrego-93aa522b8/' },
    { name: 'Hussen Premier', role: 'Database', image: 'https://cdn.sofifa.net/players/192/448/24_120.png', linkedin: 'https://www.linkedin.com/in/hussen-premier/' },
    { name: 'Jack Gao', role: 'Frontend (Web)/(Mobile)', image: 'https://cdn.sofifa.net/players/232/411/24_120.png', linkedin: 'https://www.linkedin.com/in/jack-gao-376328290' },
    { name: 'Luckner Ablard', role: 'Frontend (Mobile)', image: 'https://cdn.sofifa.net/players/206/517/24_120.png', linkedin: 'https://www.linkedin.com/in/luckner-ablard/' },
    { name: 'Moses Cohen', role: 'Frontend (Web)', image: 'https://cdn.sofifa.net/players/231/443/24_120.png', linkedin: 'https://www.linkedin.com/in/moses-cohen/' },
    { name: 'Patrick Rizkalla', role: 'API', image: 'https://cdn.sofifa.net/players/264/240/24_120.png', linkedin: 'https://www.linkedin.com/in/patrick-rizkalla/' },
    { name: 'Raul Graterol', role: 'Frontend (Mobile)', image: 'https://cdn.sofifa.net/players/252/371/24_120.png', linkedin: 'https://www.linkedin.com/in/raul-graterol-509716241' },
    { name: 'Ryan Rahrooh', role: 'Project Manager', image: 'https://cdn.sofifa.net/players/010/535/15_120.png', linkedin: 'https://www.linkedin.com/in/ryan-rahrooh' },
  ];

  function handleMouseEnter(event) {
    event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
  }
  function handleMouseLeave(event) {
    event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
  }

  const handleMouseEnter1 = (event) => {
    event.target.style.transform = 'scale(1.05)'; // scale up the box 5 pixels up on hover
  };

  const handleMouseLeave1 = (event) => {
    event.target.style.transform = 'scale(1)'; // Move the box back to its original position when not hovered
  };

  const redirectToLinkedIn = (linkedinUrl) => {
    window.open(linkedinUrl, '_blank'); // Open LinkedIn profile in a new tab
  };

  return (
    <div>
      <Header />
      <Container className="about-page">
        <Row className="team-members">
          {teamMembers.map((member, index) => (
            <Col key={index} md={6} lg={4} xl={3} className="member" onClick={() => redirectToLinkedIn(member.linkedin)} onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <img src={member.image} alt={member.name} style={{ verticalAlign: 'middle' }} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;
