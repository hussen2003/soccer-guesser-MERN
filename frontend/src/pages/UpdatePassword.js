import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert, ProgressBar } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import '../components/login/login.css'

const app_name = 'soccerdle-mern-ace81d4f14ec';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5001/' + route;
  }
}

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('danger');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
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

  const getPasswordRequirements = (requirements) => {
    const fulfilledStyle = { color: 'green', fontWeight: 'bold' };

    return (
      <div style={{fontSize: "14px", textAlign: 'left', marginTop: '-15px', color: 'red', marginLeft: '-10px'}}>
        <ul>
          <li style={requirements.minLength ? fulfilledStyle : null}>Minimum 8 characters</li>
          <li style={requirements.uppercase ? fulfilledStyle : null}>At least one uppercase letter</li>
          <li style={requirements.lowercase ? fulfilledStyle : null}>At least one lowercase letter</li>
          <li style={requirements.number ? fulfilledStyle : null}>At least one number</li>
        </ul>
      </div>
    );
  };

  const { token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setVariant('danger');
      return;
    }
  
    try {
      const response = await axios.post(buildPath('api/auth/updatePassword'), { newPassword, token });
      if (response.data.message) {
        setMessage(response.data.message);
        setVariant('success'); 
      }
    } catch (error) {
      console.error("Error in updatePassword", error.message);
      setMessage(error.message);
      setVariant('danger');
      navigate("/");
    }
  };
  

  return (
    <div className="login-container">
      <h2>Update Password</h2>
      {message && (
        <Alert variant={variant}>
          <Alert.Heading>{variant === 'success' ? 'Success!' : 'Error!'}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" placeholder="Enter your new password" value={newPassword} onChange={handlePasswordChange} required />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" placeholder="Enter your new password again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {getPasswordRequirements(passwordRequirements)}
        <ProgressBar striped now={passwordStrength} variant={passwordStrength < 50 ? 'danger' : passwordStrength < 80 ? 'warning' : 'success'} />
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
          Submit
        </Button>
        <p style={{marginTop: '10px'}}>
          Back to <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default UpdatePassword;
