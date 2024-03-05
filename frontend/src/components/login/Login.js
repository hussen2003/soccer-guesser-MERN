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
  function handleMouseEnter(event) {
    event.target.style.backgroundColor = '#3dea76'; // Change background color on hover
  }
  function handleMouseLeave(event) {
    event.target.style.backgroundColor = '#efeee9'; // Change background color back to normal when mouse leaves
  }

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={doLogin}>
        <div>
            <label htmlFor="email">Username:</label>
            <input
              type="username"
              id="username"
              value={loginName}
              ref={(c) => (loginName = c)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={loginPassword}
              ref={(c) => (loginPassword = c)}
              required
            />
          </div>
          <Button type="submit" variant="outline-primary" onClick={doLogin}>Login</Button>{' '}
          <div style={{ margin: '20px 0' }}></div> { }
            <Button onClick={signup}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '20px', backgroundColor: '#efeee9', color: 'rgb(0, 0, 0)', fontSize: '30px', width: '225px', height: '80px', cursor: 'pointer' }}>
                Sign Up
            </Button>
      </form>
    </div>
  );
};

export default Login;
