import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the auth token in cookies when the component mounts
    const token = Cookies.get('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      alert('You are already logged in.');
      return;
    }
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/login', formData);
      console.log(response.data);
      const token = response.data.token; // Adjust according to the structure of your response
      Cookies.set('authToken', token, { expires: 7, sameSite: 'Lax' });  // Store the token in a cookie for 7 days
      alert("Login successful");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleLogout = () => {
    Cookies.remove('authToken'); // Remove the authToken cookie
    setIsLoggedIn(false); // Set isLoggedIn state to false
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <h2>Login</h2>
      {isLoggedIn ? (
        <div>
          <p>You are already logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
