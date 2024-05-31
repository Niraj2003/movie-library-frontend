import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // Check for the auth token in cookies when the component mounts
        const token = Cookies.get('authToken');
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);
    
    return (
        <div>
            <h2>Welcome to Movie Library</h2>
            {isLoggedIn && <p>You are logged in.</p>}
            { !isLoggedIn && <p> <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to get started. </p> }
        </div>
    );
};

export default Home;
