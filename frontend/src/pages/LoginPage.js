import React from 'react';
import Login from '../components/login/Login.js';
import logo from '../images/logo.png';

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <img src={logo} alt="Logo" style={{ width: '550px', height: '550px', marginTop: '-100px', marginBottom: '-500px' }} />
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
