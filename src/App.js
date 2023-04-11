import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=7a47242793d59eb1570389827de8affd&language=en-US"
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClearClick = () => {
    setSelectedMovie(null);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
    setSearchQuery("")
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="movie-container">
      <header className="header">
        <h1>Govind <span>movieZone</span></h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </header>
      {selectedMovie ? (
        <div className="movie-details">
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="movie-poster"
            onClick={handleClearClick}
          />
          <div className="movie-info">
            <h2 className="movie-title">{selectedMovie.title}</h2>
            <p className="movie-release-date">
              Release Date: {selectedMovie.release_date}
            </p>
            <p className="movie-overview">Overview: {selectedMovie.overview}</p>
            <button onClick={handleBackClick}>Back</button>
          </div>
        </div>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
                onClick={() => handleMovieClick(movie)}
              />
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieApp;
