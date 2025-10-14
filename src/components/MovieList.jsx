import React from "react";
import MovieItem from "./MovieItem";

function MovieList({ movies, onSelectMovie }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-empty">
        <div className="no-movies-animation">
          <div className="popcorn-spill">
            <span>🍿</span>
            <span>🎬</span>
            <span>🍿</span>
          </div>
          <h3>Oops! Sorry</h3>
          <p>No movies found with posters. Try a different search!</p>
          <div className="film-reel">
            <div className="reel-hole"></div>
            <div className="reel-hole"></div>
            <div className="reel-hole"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-wrapper">
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieItem
            key={movie.imdbID}
            movie={movie}
            onSelect={onSelectMovie}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
