import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import { searchMovies, getMovieDetails } from "./services/movieService";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (term) => {
    setLoading(true);
    setError(null);
    setSelectedMovie(null);
    try {
      const results = await searchMovies(term);
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = async (imdbID) => {
    setLoading(true);
    setError(null);
    try {
      const details = await getMovieDetails(imdbID);
      setSelectedMovie(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <main className="main-content">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onBack={handleBack} />
        ) : (
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        )}
      </main>
    </>
  );
}

export default App;
