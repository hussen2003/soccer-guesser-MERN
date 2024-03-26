import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header.js';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/auth/verifyEmail', { token });
        if (response.status === 200) {
          setVerificationStatus('Email verified successfully');
        } else {
          setVerificationStatus('Error verifying email');
        }
      } catch (error) {
        setVerificationStatus('Error verifying email');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <Header />
      <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
        {verificationStatus}
      </div>
    </div>
  );
};

export default VerifyEmail;
