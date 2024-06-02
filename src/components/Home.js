import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, ListGroup } from 'react-bootstrap';
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
    <Container>
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="jumbotron jumbotron-fluid mt-4">
            <div className="container text-center">
              <h3 className="text-primary">Public Lists</h3>
              {publicLists.map(list => (
                <Card key={list._id} className="mb-3 shadow" style={{ cursor: 'pointer' }} onClick={() => { if (selectedListId == null) setSelectedListId(list._id); else if(selectedListId == list._id) setSelectedListId(null)  ; else setSelectedListId(list._id); }}>
                  <Card.Header className="bg-light" onClick={() => setSelectedListId(selectedListId === list._id ? null : list._id)}>
                    <strong className="text-dark">{list.name}</strong>
                    <p className="text-muted">Created by - <i>{list.user.username}</i></p>
                  </Card.Header>
                  {selectedListId === list._id && (
                    <ListGroup variant="flush">
                      {list.movies.map(movie => (
                        <ListGroup.Item key={movie.imdbID} className="list-group-item">
                          <Link to={`/movie/${movie.imdbID}`} className="text-decoration-none text-dark">{movie.Title}</Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card>
              ))}
              <p className="text-center">
                <div className="btn-group">
                  <Link to="/login" className="btn btn-primary">Login</Link>
                  <Link to="/register" className="btn btn-secondary">Register</Link>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
