import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Spinner } from 'react-bootstrap';

const axiosInstance = axios.create({
  withCredentials: true
});

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [movieLists, setMovieLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('https://movie-library-backend-theta.vercel.app/api/auth/profile', {
          withCredentials: true // Include cookies with the request
        });
        setUserData(response.data.user);
        setMovieLists(response.data.lists);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred');
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  

  if (loading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Data</h2>
      <>
        <p>Email: {userData.email}</p>
        <p>Username: {userData.username}</p>
      </>

      <h2>Movie Lists</h2>
      {movieLists.map((list) => (
        <ListGroup key={list._id}>
          <ListGroup.Item variant="primary">{list.name}</ListGroup.Item>
          {list.movies.map((movie) => (
            <ListGroup.Item key={movie.imdbID}>{movie.Title}</ListGroup.Item>
          ))}
        </ListGroup>
      ))}
    </div>
  );
};

export default Profile;
