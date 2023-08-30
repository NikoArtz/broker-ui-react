import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({setTokenIsValid  }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('handleLoginAnother');
      const response = await axios.post('http://localhost:8080/auth', {
        username,
        password,
      });

      const receivedToken = response.data.accessToken; // Assuming the token is in the response
      //   setToken(receivedToken);
      localStorage.setItem('token', receivedToken);
      // onLogin(receivedToken);
         setTokenIsValid(true);
       navigate('/');
   
      console.log('handleLoginAnother2');
    } catch (error) {
      console.error('Login error:', error);
    }
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={
        handleLogin
      }>Login</button>
    </div>
  );
};