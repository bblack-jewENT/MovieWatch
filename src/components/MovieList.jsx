import React from "react";
import MovieItem from "./MovieItem";

function MovieList({ movies, onSelectMovie }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-empty">
        No movies found. Try a different search.
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} onSelect={onSelectMovie} />
      ))}
    </div>
  );
}

export default MovieList;
