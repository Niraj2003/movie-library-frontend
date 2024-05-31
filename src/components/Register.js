import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  withCredentials: true
});

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
    try {
      const response = await axiosInstance.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/register', formData);
      console.log(response.data);
      alert("Registration successful");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} required />
      </label>
      <br/>
      <label>
        Username:
        <input type="text" name="username" onChange={handleChange} required />
      </label>
      <br/>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange} required />
      </label>
      <br/>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
