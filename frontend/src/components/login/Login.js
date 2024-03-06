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
          <div style={{ margin: '10px 0' }}></div> { }
          <p>Don't have an account? Click Below to sign up!</p>
          <Button type="submit" variant="outline-primary" onClick={signup}>
              Sign Up
          </Button>
      </form>
    </div>
  );
};

export default Login;
