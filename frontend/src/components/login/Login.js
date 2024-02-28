import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('/api/login', { email, password });
  //     console.log(response.data); // Handle successful login
  //   } catch (err) {
  //     setError(err.response.data.message); // Handle login error
  //   }
  // };

  return (
    <div className='login-container'>
      <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="outline-primary">Login</Button>{' '}
    </div>
  );
};

export default Login;
