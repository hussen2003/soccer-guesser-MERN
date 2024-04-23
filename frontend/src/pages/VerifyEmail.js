import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const app_name = 'soccerdle-mern-ace81d4f14ec';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5001/' + route;
  }
}

const VerifyEmail = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(buildPath('api/auth/verifyEmail'), { token });
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
      <div style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: 'rgba(33,37,41, 0.87)',
        color: 'white',    
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(1px)',
        marginTop: '200px'
      }}>
        {verificationStatus} !
      </div>
    </div>
  );
};

export default VerifyEmail;
