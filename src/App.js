import React, { useEffect } from 'react';
import MainPage from './components/MainPage'; // Import the MainPage component
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { startTokenExpirationCheck } from './services/authUtils';

// import Worker from './refresh.worker.js';


const App = () => {

console.log('App');
  startTokenExpirationCheck() // TODO FIX - pass navigatte from use Navigate
  // useEffect(() => {
  //   // Create a new Worker instance

    
  //   const worker = new Worker('/refresh.worker.js');

  //   // Set up an interval to send a message to the worker every 5 seconds
  //   const interval = setInterval(() => {
  //     worker.postMessage({ action: 'validateToken' });
  //   }, 5000);

  //   // Listen for messages from the worker
  //   worker.addEventListener('message', (event) => {
  //     const result = event.data;
  //     // Handle the result from the worker (e.g., update state)
  //     console.log('Received result:', result);
  //   });

  //   return () => {
  //     // Clean up when the component unmounts
  //     clearInterval(interval);
  //     worker.terminate();
  //   };
  // }, []);
  // // useEffect(() => {
  //   const tokenCheckInterval = setInterval(() => {
  //     const token = localStorage.getItem('token');
  //     if (isValidToken(token)) {
  //       clearInterval(tokenCheckInterval);
  //       localStorage.removeItem('token');
  //       history.push('/login');
  //     }
  //   }, 30000); // 30 seconds in milliseconds

  //   return () => {
  //     clearInterval(tokenCheckInterval);
  //   };
  // }, [history]);

  // useEffect(() => {
  //   console.log('useEffect');
  //   const tokenCheckInterval = setInterval(() => {
  //     if (!checkToken()) {
  //       localStorage.removeItem('token');
  //       console.log('Token expired1');
  //       window.location.href = '/login';
  //     }
  //   }, 5000);

  //   return () => {
  //     clearInterval(tokenCheckInterval);
  //   };
  // }, []);




  return (
    <div>
      <MainPage />


    </div>
  );
};

export default App;
