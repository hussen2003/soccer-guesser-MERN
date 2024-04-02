import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './login.css';
import Alert from 'react-bootstrap/Alert';

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
  const [error, setError] = useState("");
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
        setError(res.error);
        return;
      } 
      else {
        var user = {
          _id: res._id,
          name: res.name,
          email: res.email,
          username: res.username,
          score: res.score,
        };
        sessionStorage.setItem("user_data", JSON.stringify(user));
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
      <div style={{ margin: '20px 0' }}></div> { }
      {(error==="Email not verified") && (<Alert key={'danger'} variant={'danger'}>
          {error}
        </Alert>)}
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
          {(error==="Username does not exist") && (<p style={{ color: 'red' , fontWeight: 'bold'}}>{error}</p>)}
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
          {(error==="Incorrect password") && (<p style={{ color: 'red' , fontWeight: 'bold'}}>{error}</p>)}
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
        <div style={{ margin: '20px 0' }}></div> { }
        <p>Don't have an account? <a href="/SignUpPage">Sign Up!</a></p>
      </form>
    </div>
  </div>
  );
};

export default Login;
