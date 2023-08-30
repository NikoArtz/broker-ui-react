import { useNavigate } from 'react-router-dom';
import { checkToken } from './common';

export function checkTokenExpiration(navigate) {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');
    
    if (!token || !expiration) {
      // No token or expiration found, redirect to login
      redirectToLogin(navigate);
      return;
    }
  
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (currentTime > parseFloat(expiration)) {
      // Token has expired, redirect to login
      redirectToLogin(navigate);
    }
  }
  
  function redirectToLogin(navigate) {
    navigate('/login');
  }
  
  export function startTokenExpirationCheck(navigate) {
    // Check token expiration every 30 seconds
    setInterval(() => checkTokenExpiration(navigate), 30000);
  }
  