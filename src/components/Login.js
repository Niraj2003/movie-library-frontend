import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    console.log('Submitting login form...');
    // console.log('Form data:', formData);
    console.log('Submitting on URL:', `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log('Login successful:');
      const token = response.data.token; 
      Cookies.set('authToken', token, { expires: 7 }); 
      alert("Login successful");
      setIsLoggedIn(true);
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
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
    Cookies.remove('authToken');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <div className='container'>
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          {isLoggedIn ? (
            <div>
              <p>You are already logged in.</p>
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input className="form-control" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input className="form-control" type="password" name="password" value={formData.password} onChange={handleInputChange} required />
              </div>
              <div className="form-group text-center">
                <button className="btn btn-primary" type="submit">Login</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
