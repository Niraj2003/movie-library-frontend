import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [movieLists, setMovieLists] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [selectedListId, setSelectedListId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Fetching user data...' )
      // console.log(document.cookie);
      console.log("Above is cookie")
      if(document.cookie === "") {
        console.log('No cookie found')
        setIsLoggedIn(false);
        return;
      }
      try {
        console.log('Fetching user data...');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/profile`, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
          },
          withCredentials: true,
        });
        console.log('User data fetched:') 
        // console.log(response.data);
        setUserData(response.data.user);
        setMovieLists(response.data.lists);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false); 
      }
    };
  
    fetchUserData();
  }, []);

  // console.log('Rendering Profile component...');

  return (
    <div className="container">
      <Navbar/>
      {isLoggedIn ? (
        <Row>
          <Col md={6}>
            <Card className="mb-3 shadow">
              <Card.Body>
                <Card.Title className="text-primary">My Profile</Card.Title>
                <Card.Text>
                  <strong>Username:</strong> {userData.username}<br />
                  <strong>Email:</strong> {userData.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <h3>Movie Lists</h3>
            {movieLists.map(list => (
              <Card key={list._id} className="mb-3 shadow" style={{ cursor: 'pointer' }} onClick={() => { if (selectedListId == null) setSelectedListId(list._id); else if(selectedListId == list._id) setSelectedListId(null)  ; else setSelectedListId(list._id); }}>
                <Card.Header className="bg-light" onClick={() => setSelectedListId(selectedListId === list._id ? null : list._id)}>
                <strong >{list.name}</strong>
              </Card.Header>
              {selectedListId === list._id && (
                <ListGroup variant="flush">
                  {list.movies.map(movie => (
                    <ListGroup.Item key={movie.imdbID}>
                      <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card>
            ))}
          </Col>
        </Row>
      ) : (
        <div>
          <h3>Please log in to view your profile.</h3>
        </div>
      )}
    </div>
  );
};

export default Profile;
