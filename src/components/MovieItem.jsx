import React from "react";

function MovieItem({ movie, onSelect }) {
  const handleClick = () => {
    onSelect(movie.imdbID);
  };

  return (
    <div className="movie-item" onClick={handleClick}>
      <img
        src={
          movie.Poster &&
          movie.Poster !== "N/A" &&
          movie.Poster !== null &&
          movie.Poster !== undefined &&
          movie.Poster !== ""
            ? movie.Poster
            : "/placeholder-poster.jpg"
        }
        alt={`${movie.Title} poster`}
        className="movie-poster"
        onError={(e) => {
          if (
            e.target.src !==
            window.location.origin + "/placeholder-poster.jpg"
          ) {
            e.target.src = "/placeholder-poster.jpg";
          }
        }}
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieItem;
