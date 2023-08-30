import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidToken } from '../services/common';



export default function TokenChecker() {
    const navigate = useNavigate();

    useEffect(() => {
        const worker = new Worker('worker-file.js'); // Create a web worker

        // Listen for messages from the web worker
        worker.onmessage = (event) => {
            if (event.data === 'expired') {
                navigate('/login'); // Redirect to login page
            }
        };

        // Clean up the web worker when the component unmounts
        return () => {
            worker.terminate();
        };
    }, [navigate]);

    return <div></div>; // This component doesn't render anything
};