import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './login.css';

const app_name = 'soccerdle-mern-ace81d4f14ec';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5001/' + route;
  }
}

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { username: values.username, password: values.password };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/auth/login'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      var res = JSON.parse(await response.text());

      if (res.error) {
        if (res.error === 'Username does not exist') {
          setErrors({ ...errors, username: 'Username does not exist' });
        } else if (res.error === 'Incorrect password') {
          setErrors({ ...errors, password: 'Incorrect password' });
        } else {
          setMessage(res.error);
        }
        return;
      } else {
        var user = {
          _id: res._id,
          name: res.name,
          email: res.email,
          username: res.username,
          score: res.score,
        };
        sessionStorage.setItem('user_data', JSON.stringify(user));
        window.location.href = '/LandingPage';
      }
    } catch (e) {
      setMessage('Internal Server Error');
      return;
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && (
        <Alert variant="danger">
          <Alert.Heading>Error!</Alert.Heading>
          <p>{message}</p>
        </Alert>
      )}
      <form onSubmit={doLogin}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" placeholder="Enter your username" value={values.username} onChange={onChange} required />
          <div className="error" style={{ color: 'red', height: '15px', display: errors.username ? 'block' : 'none' }}>
            {errors.username}
          </div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" value={values.password} onChange={onChange} required />
          <div className="error" style={{ color: 'red', height: '15px', display: errors.password ? 'block' : 'none' }}>
            {errors.password}
          </div>
        </div>
        <Button
          type="submit"
          variant="outline-primary"
          style={{
            padding: '10px 20px',
            backgroundColor: '#90ee90',
            color: 'rgb(0, 0, 0)',
            fontSize: '15px',
            cursor: 'pointer',
            width: '150px',
            height: '40px',
            transition: 'background-color 0.3s',
            width: 'calc(100% - 20px)',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#90ee90')}
        >
          Login
        </Button>
        <div style={{ margin: '20px 0' }}></div> {}
        <p>
          Don't have an account? <a href="/SignUpPage">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
