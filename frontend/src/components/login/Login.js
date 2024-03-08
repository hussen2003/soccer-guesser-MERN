import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './login.css';

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
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      if (res.error) {
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
    <div className='login-container'>
      <Button onClick = {aboutus}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#4CAF50'}
    onMouseLeave={(e) => e.target.style.backgroundColor = '#90ee90'}
    style={{ position: 'fixed', top: '10.5vh', right: '4vw', padding: '10px 20px', backgroundColor: '#90ee90', color: 'rgb(0, 0, 0)', fontSize: '15px', width: '150px', height: '40px', transition: 'background-color 0.3s', border: 'none'}}
    >About Us</Button>
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
    </div>
  );
};

export default Login;
