import React from "react";

function MovieDetails({ movie, onBack }) {
  if (!movie) {
    return (
      <div className="movie-details-loading">Loading movie details...</div>
    );
  }

  return (
    <div className="movie-details">
      <button className="back-button" onClick={onBack}>
        ← Back to Search
      </button>
      <div className="movie-details-content">
        <img
          src={
            movie.Poster !== "N/A" ? movie.Poster : "/placeholder-poster.jpg"
          }
          alt={`${movie.Title} poster`}
          className="movie-details-poster"
        />
        <div className="movie-details-info">
          <h1 className="movie-details-title">{movie.Title}</h1>
          <p className="movie-details-year">{movie.Year}</p>
          <p className="movie-details-genre">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="movie-details-plot">
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p className="movie-details-cast">
            <strong>Cast:</strong> {movie.Actors}
          </p>
          <div className="movie-details-ratings">
            <h3>Ratings:</h3>
            <ul>
              {movie.Ratings.map((rating, index) => (
                <li key={index}>
                  <strong>{rating.Source}:</strong> {rating.Value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
