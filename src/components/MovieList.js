import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ListGroup, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

axios.defaults.withCredentials = true;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [listName, setListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (movie) => {
    if (selectedMovies.includes(movie)) {
      setSelectedMovies(selectedMovies.filter((m) => m !== movie));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const handleSubmit = async () => {
    const token = Cookies.get('authToken');
    // console.log("Handle submit-");
    // console.log("Token- " + token);
    // console.log("List Name- " + listName);
    // console.log("Is Public- " + isPublic);
    // console.log("Submitting on URL - " + `${process.env.REACT_APP_BACKEND_URL}/api/lists/create`);
    if (!token) {
      alert('You need to log in first');
      return;
    }
    const listData = {
      name: listName,
      movies: selectedMovies,
      isPublic: isPublic
    };
    // console.log(listData);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/lists/create`, listData,{
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
        },
        withCredentials: true,
      });
      alert('List created successfully');
      navigate('/profile');
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Config:', error.config);
    }
  };

  const handleSearch = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      alert('You need to log in first');
      return;
    }
    console.log(`${process.env.REACT_APP_OMDB_API}&s=${searchTerm}`);
    try {
      const response = await axios.get(`${process.env.REACT_APP_OMDB_API}&s=${searchTerm}`,{withCredentials: false});
      setMovies(response.data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3 className="text-center">Selected Movies</h3>
          {selectedMovies.length === 0 ? <p>No movies selected</p> : selectedMovies.map(movie => <p>{movie.Title}</p>)}

          <Form.Group controlId="listName">
            <Form.Control
              type="text"
              placeholder="Enter list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="isPublic">
            <Form.Check
              type="checkbox"
              label="Public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </Form.Group>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Control
                type="text"
                placeholder="Search movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Form>
          <ListGroup>
            {movies && movies.map((movie) => (
              <ListGroup.Item
                key={movie.imdbID} // Add key prop here
                className={selectedMovies.includes(movie) ? 'list-group-item-success' : ''}
              >
                {movie.Title}
                <Button onClick={() => handleSelect(movie)}>
                  {selectedMovies.includes(movie) ? 'Deselect' : 'Select'}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button onClick={handleSubmit} className="mt-3">Submit Selected Movies</Button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
