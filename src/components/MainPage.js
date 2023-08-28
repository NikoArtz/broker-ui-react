import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

const ProtectedContent = ({ handleLogout, handleProtectedRequest }) => {
  return (
    <div>
      <p>You are logged in!</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleProtectedRequest}>Make Protected Request</button>
    </div>
  );
};

const MainPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    // Check token expiration and log out if expired
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = parseJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          handleLogout();
        }
      }
    };

    checkTokenExpiration();
  }, [token]);

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  };

  const handleLogin = (receivedToken) => {
    setToken(receivedToken);
    localStorage.setItem('token', receivedToken);
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
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/protected"
          element={
            token ? (
              <ProtectedContent
                handleLogout={handleLogout}
                handleProtectedRequest={handleProtectedRequest}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/protected" />} />
      </Routes>
    </Router>
  );
};

export default MainPage;
