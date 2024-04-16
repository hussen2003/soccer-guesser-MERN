import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './signup.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

const app_name = 'soccerdle-mern-ace81d4f14ec';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5001/' + route;
  }
}

const getPasswordRequirements = (requirements) => {
  const fulfilledStyle = { color: 'green', fontWeight: 'bold' };

  return (
    <div>
      <p>Password requirements:</p>
      <ul>
        <li style={requirements.minLength ? fulfilledStyle : null}>Minimum 8 characters</li>
        <li style={requirements.uppercase ? fulfilledStyle : null}>At least one uppercase letter</li>
        <li style={requirements.lowercase ? fulfilledStyle : null}>At least one lowercase letter</li>
        <li style={requirements.number ? fulfilledStyle : null}>At least one number</li>
      </ul>
    </div>
  );
};

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setValues({ ...values, password: newPassword });
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
    updatePasswordRequirements(newPassword);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) {
      strength += 25;
      setPasswordRequirements((prevRequirements) => ({ ...prevRequirements, minLength: true }));
    }
    if (/[A-Z]/.test(password)) {
      strength += 25;
      setPasswordRequirements((prevRequirements) => ({ ...prevRequirements, uppercase: true }));
    }
    if (/[a-z]/.test(password)) {
      strength += 25;
      setPasswordRequirements((prevRequirements) => ({ ...prevRequirements, lowercase: true }));
    }
    if (/\d/.test(password)) {
      strength += 25;
      setPasswordRequirements((prevRequirements) => ({ ...prevRequirements, number: true }));
    }
    return strength;
  };

  const updatePasswordRequirements = (password) => {
    setPasswordRequirements({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    });
  };

  const doSignup = async (event) => {
    event.preventDefault();

    if (values.name === '' || values.username === '' || values.email === '' || values.password === '' || values.confirmPassword === '') {
      setError('Please fill out all fields.');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
      setError('Invalid email address.');
      return;
    }

    var obj = { name: values.name, email: values.email, username: values.username, password: values.password };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/auth/signup'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      var res = JSON.parse(await response.text());

      if (res.error) {
        setError(res.error);
        return;
      } else if (res.errors) {
        setError(res.errors.join(', ')); // Combine all error messages into one string
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
        window.location.href = '/';
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    if (name === 'confirmPassword' && value !== values.password) {
      isValid = false;
    }
    if (value === '') {
      isValid = false;
    }
    setValues({ ...values, [name]: value });
    setError(''); // Clear error message when input changes
  };

  return (
    <div className="signup-container">
      <form onSubmit={doSignup}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={values.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={values.username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter your password again"
            value={values.confirmPassword}
            onChange={onChange}
            required
          />
          {error && (
            <Alert variant="danger" style={{ marginTop: '10px' }}>
              {error}
            </Alert>
          )}
        </div>
        {getPasswordRequirements(passwordRequirements)}
        <ProgressBar>
          <ProgressBar
            striped
            now={passwordStrength}
            variant={passwordStrength < 50 ? 'danger' : passwordStrength < 80 ? 'warning' : 'success'}
            key={1}
          />
        </ProgressBar>
        <Button
          variant="primary"
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#90ee90',
            color: 'rgb(0, 0, 0)',
            fontSize: '15px',
            cursor: 'pointer',
            width: '150px',
            height: '40px',
            transition: 'background-color 0.3s',
            marginRight: '10px',
            marginTop: '10px',
            width: 'calc(100% - 20px)',
          }}
        >
          Sign up
        </Button>
        <div style={{ margin: '20px 0' }}></div>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;