import React from "react";

function MovieItem({ movie, onSelect }) {
  const handleClick = () => {
    onSelect(movie.imdbID);
  };

  return (
    <div className="movie-item" onClick={handleClick}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-poster.jpg"}
        alt={`${movie.Title} poster`}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieItem;
