import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './login.css';
import Nav from'react-bootstrap/Nav';

const app_name = 'soccerdle-mern-ace81d4f14ec'
function buildPath(route)
{
  if (process.env.NODE_ENV === 'production')
  {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  }
  else
  {
    return 'http://localhost:5001/' + route;
  }
}
function Login() {
  const signup = (event) => {
    event.preventDefault();
    setMessage("success?");
    window.location.href = "/SignUpPage";
  }
  var loginName;
  var loginPassword;
  const [message, setMessage] = useState("");

  const aboutus = async (event) => {
    event.preventDefault();
    setMessage("success?");
    window.location.href = "/AboutPage";
  }

  const doLogin = async (event) => {
    event.preventDefault();
    var obj = { username: loginName.value, password: loginPassword.value };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/auth/login'), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      if (res.error) {
        alert(res.error);
        return;
      } else {
        var user = {
          _id: res._id,
          name: res.name,
          email: res.email,
          username: res.username,
          score: res.score,
        };
        localStorage.setItem("user_data", JSON.stringify(user));
        setMessage("success?");
        window.location.href = "/LandingPage";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div>
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={doLogin}>
        <div className="form-group"> {/* Added a class for consistency */}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={loginName}
            ref={(c) => (loginName = c)}
            required
          />
        </div>
        <div className="form-group"> {/* Added a class for consistency */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={loginPassword}
            ref={(c) => (loginPassword = c)}
            required
          />
        </div>
        <Button type="submit" variant="outline-primary" onClick={doLogin} style={{
          padding: '10px 20px',
          backgroundColor: '#90ee90',
          color: 'rgb(0, 0, 0)',
          fontSize: '15px',
          cursor: 'pointer',
          width: '150px',
          height: '40px',
          transition: 'background-color 0.3s'
        }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4CAF50'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#90ee90'}>
          Login</Button>{' '}
        <div style={{ margin: '10px 0' }}></div> { }
        <p>Don't have an account? Click Below to sign up!</p>
        <Button
          type="submit"
          variant="outline-primary"
          onClick={signup}
          style={{
            padding: '10px 20px',
            backgroundColor: '#90ee90',
            color: 'rgb(0, 0, 0)',
            fontSize: '15px',
            cursor: 'pointer',
            width: '150px',
            height: '40px',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4CAF50'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#90ee90'}>
          Sign Up
        </Button>
      </form>
      <div style={{ margin: '20px 0' }}></div> { }
      <Button
          type="submit"
          variant="outline-primary"
          onClick={aboutus}
          style={{
            padding: '10px 20px',
            backgroundColor: '#90ee90',
            color: 'rgb(0, 0, 0)',
            fontSize: '15px',
            cursor: 'pointer',
            width: '150px',
            height: '40px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4CAF50'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#90ee90'}>
          About Us
        </Button>


      {/* <Nav variant="underline">
        <Nav.Item>
          <Nav.Link href="/AboutPage">About Us</Nav.Link>
        </Nav.Item>
      </Nav> */}
      {/* <button class="shrink-border">About Us</button> */}
      {/* <a href="/AboutPage" 
  //  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} 
  //  onMouseLeave={(e) => e.target.style.textDecoration = 'none'} 
   //</div>style={{ textDecoration: 'none', color: 'inherit', fontSize: '15px', transition: 'text-decoration 0.3s', }}>About Us</a>
   ></a> */}

{/* <a href="/AboutPage" class="btn">
        <svg width="130px" height="45px" viewBox="0 0 180 60" class="border">
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
        </svg>
        <span>About Us</span>
      </a> */}
    </div>
  </div>
  );
};

export default Login;
