import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting registration form...');
    // console.log('Form data:', formData);
    console.log('Submitting on URL:', `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData);
      // console.log(response.data);
      alert("Registration successful");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };


return (
  <div className='container'>
    <Navbar />
    <div className="row justify-content-center">
      <div className="col-md-6">
          <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default Register;
