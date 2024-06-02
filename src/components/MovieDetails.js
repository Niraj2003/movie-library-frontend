import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; // Ensure the import is correct

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('imdbID:', imdbID);
    if (imdbID) {
      setLoading(true);
      console.log('Fetching movie details...');
      axios.get(`${process.env.REACT_APP_OMDB_API}&i=${imdbID}`, { withCredentials: false })
        .then(response => {
          console.log('Movie details fetched successfully:', response.data);
          setMovie(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error!', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [imdbID]);

    return (
      <div>
        <div className="container">
          <Navbar />
          {loading ? (
            <p>Loading...</p>
          ) : movie ? (
            <div className="row">
              <div className="col-md-6">
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
                <p>{movie.Plot}</p>
                <h3>Released</h3>
                <p>{movie.Released}</p>
                <h3>Runtime</h3>
                <p>{movie.Runtime}</p>
                <h3>Genre</h3>
                <p>{movie.Genre}</p>
                <h3>Director</h3>
                <p>{movie.Director}</p>
                <h3>Writer</h3>
                <p>{movie.Writer}</p>
              </div>
              <div className="col-md-6">
                <h3>Actors</h3>
                <ul>
                  {movie.Actors.split(',').map((actor) => (
                    <li key={actor.trim()}>{actor.trim()}</li>
                  ))}
                </ul>
                <h3>Awards</h3>
                <p>{movie.Awards}</p>
                <h3>Metascore</h3>
                <p>{movie.Metascore}</p>
                <h3>IMDb Rating</h3>
                <p>{movie.imdbRating}</p>
                <h3>IMDb Votes</h3>
                <p>{movie.imdbVotes}</p>
                <h3>DVD</h3>
                <p>{movie.DVD}</p>
                <h3>Box Office</h3>
                <p>{movie.BoxOffice}</p>
                <h3>Production</h3>
                <p>{movie.Production}</p>
                <h3>Website</h3>
                <p>{movie.Website}</p>
                <h3>Language</h3>
                <p>{movie.Language}</p>
                <h3>Country</h3>
                <p>{movie.Country}</p>
                <h3>Awards</h3>
                <p>{movie.Awards}</p>
                <h3>Ratings</h3>
                <ul>
                  {movie.Ratings.map((rating) => (
                    <li key={rating.Source}>
                      {rating.Source}: {rating.Value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>No movie found.</p>
          )}
        </div>
      </div>
    );
    
}

export default MovieDetails;
