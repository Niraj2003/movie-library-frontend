import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup } from 'react-bootstrap';
import Navbar from './Navbar';

const Home = () => {
    const [publicLists, setPublicLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lists/public-lists`)
      .then(response => {
        setPublicLists(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
    
return (
  <div className="container">
    <Navbar />
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="jumbotron mt-4">
          <h3>Public Lists</h3>
          {publicLists.map(list => (
            <Card key={list._id} className="mb-3 shadow" style={{cursor: 'pointer'}} onClick={() => { if(selectedListId==null) setSelectedListId(list._id); else setSelectedListId(null); }}>
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
          <p className="text-center">
            <Link to="/login" className="btn btn-primary">Login</Link> or 
            <Link to="/register" className="btn btn-secondary">Register</Link> to get started.
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default Home;
