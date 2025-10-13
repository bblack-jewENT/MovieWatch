import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import { getPopularMovies } from "../services/movieService";

function MoviesPage({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const results = await getPopularMovies(page);
      // Shuffle the movies array for randomness
      const shuffled = [...results].sort(() => Math.random() - 0.5);
      setMovies(shuffled);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRefresh = () => {
    // Get a random page between 1 and 10 to show different movies
    const randomPage = Math.floor(Math.random() * 10) + 1;
    fetchMovies(randomPage);
  };

  return (
    <main className="main-content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>Popular Movies</h2>
        <button
          onClick={handleRefresh}
          className="refresh-button"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "var(--primary-color)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Shuffle Movies
        </button>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <MovieList movies={movies} onSelectMovie={onSelectMovie} />
    </main>
  );
}

export default MoviesPage;
