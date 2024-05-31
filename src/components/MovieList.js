import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ListGroup, Button, Form } from 'react-bootstrap';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [listName, setListName] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://movie-library-backend-theta.vercel.app/api/movies');
                if (Array.isArray(response.data)) {
                    setMovies(response.data);
                } else if (response.data.Search && Array.isArray(response.data.Search)) {
                    setMovies(response.data.Search);
                } else {
                    console.error('Expected an array for movies data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    const handleSelect = (movie) => {
        if (selectedMovies.includes(movie)) {
            setSelectedMovies(selectedMovies.filter((m) => m !== movie));
        } else {
            setSelectedMovies([...selectedMovies, movie]);
        }
    };

    const handleSubmit = async () => {
        const token = Cookies.get('authToken');
        if (!token) {
            alert('You need to log in first');
            return;
        }

        const listData = {
            name: listName,
            movies: selectedMovies,
            isPublic: isPublic
        };

        try {
            const response = await axios.post(
                'https://movie-library-backend-theta.vercel.app/api/lists',
                listData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async () => {
        const token = Cookies.get('authToken');
        if (!token) {
            alert('You need to log in first');
            return;
        }

        try {
            const response = await axios.get(
                `https://movie-library-backend-theta.vercel.app/api/movies/search?query=${searchTerm}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data && Array.isArray(response.data.Search)) {
                setMovies(response.data.Search);
            } else {
                console.error('Expected an object with a Search array for movies data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
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
                {movies.map((movie) => (
                    <ListGroup.Item
                        key={movie.id}
                        style={{
                            backgroundColor: selectedMovies.includes(movie) ? 'lightgreen' : 'white',
                        }}
                    >
                        {movie.title}
                        <Button onClick={() => handleSelect(movie)}>
                            {selectedMovies.includes(movie) ? 'Deselect' : 'Select'}
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Button onClick={handleSubmit}>Submit Selected Movies</Button>
        </div>
    );
};

export default MovieList;
