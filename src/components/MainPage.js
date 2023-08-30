import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import { isValidToken, checkToken } from '../services/common';
import TokenChecker from './TokenChecker';

const ProtectedContent = ({ handleLogout, handleProtectedRequest }) => {
  return (
    <div>
      <p>You are logged in!</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleProtectedRequest}>Make Protected Request</button>
    </div>
  );
};

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  if (token && isValidToken(token)) {
    return element;
  } else {
    console.log('PrivateRoute');
    return <Navigate to="/login3" replace />;
  }
};

const MainPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tokenValidationInterval, setTokenValidationInterval] = useState(null);

  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    console.log('useEffect');
    setTokenIsValid(isValidToken(token)); // Validate token when token changes
  }, [token]);

  const handleLogin = (receivedToken) => {
    console.log('handleLogin2');
    setToken(receivedToken);
    localStorage.setItem('token', receivedToken);
    setTokenIsValid(true);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const handleProtectedRequest = async () => {
    try {
      const response = await axios.get('your_protected_api_endpoint', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Process response data from protected API request
    } catch (error) {
      console.error('Protected request error:', error);
    
      // If token is invalid/expired, prompt the user to log in again
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  return (
    <div>

    <Router>
 
      <Routes>
        <Route path="/login" element={<Login setTokenIsValid={setTokenIsValid} />} />
        <Route path="/" element={tokenIsValid ? <PrivateRoute element={<ProtectedContent handleLogout={handleLogout} handleProtectedRequest={handleProtectedRequest} />} /> : <Navigate to="/login" />} />
        {/* <Route path="/" element={<Navigate to="/protected" />} /> */}
      </Routes>
    </Router>
    </div>
  );
};

export default MainPage;