import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';
import '../components/login/login.css'

const app_name = 'soccerdle-mern-ace81d4f14ec';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5001/' + route;
  }
}

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('danger');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(buildPath('api/auth/forgetPassword'), { email });
      if (response.data.message) {
        setMessage(response.data.message);
        setVariant('success'); 
      }
    } catch (error) {
      console.error("Error in forgetPassword", error.message);
      setMessage(error.response.data.error); 
      setVariant('danger'); 
    }
  };

  return (
    <div className="login-container">
      <h2>Reset Password</h2>
      {message && (
        <Alert variant={variant}>
          <Alert.Heading>{variant === 'success' ? 'Goal!' : 'Error!'}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgetPassword;
