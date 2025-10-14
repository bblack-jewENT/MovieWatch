import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import MoviesPage from "./components/MoviesPage";
import ComingSoonPage from "./components/ComingSoonPage";
import Footer from "./components/Footer";
import {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
} from "./services/movieService";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  // Fetch default movies on initial load
  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setLoading(true);
      setError(null);
      setSelectedMovie(null);
      setRawResponse(null);
      try {
        const results = await getPopularMovies();
        setMovies(results);
        setRawResponse(results);
      } catch (err) {
        setError(err.message);
        setMovies([]);
        setRawResponse(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultMovies();
  }, []);

  const handleSearch = async (term) => {
    setLoading(true);
    setError(null);
    setSelectedMovie(null);
    setRawResponse(null);
    try {
      const results = await searchMovies(term);
      setMovies(results);
      setRawResponse(results);
      console.log("Search term:", term);
      console.log("API results:", results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setRawResponse(null);
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

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedMovie(null);
    // Reset to home movies when navigating to home
    if (page === "home") {
      // The home page already has its own movie loading logic
    }
  };

  return (
    <>
      <NavBar onSearch={handleSearch} onNavigate={handleNavigate} />
      {currentPage === "home" && (
        <>
          <main className="main-content">
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {selectedMovie ? (
              <MovieDetails movie={selectedMovie} onBack={handleBack} />
            ) : (
              <>
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
                {(!movies || movies.length === 0) && rawResponse && (
                  <pre className="api-debug">
                    {JSON.stringify(rawResponse, null, 2)}
                  </pre>
                )}
              </>
            )}
          </main>
        </>
      )}
      {currentPage === "movies" && (
        <MoviesPage onSelectMovie={handleSelectMovie} />
      )}
      {currentPage === "coming" && <ComingSoonPage />}
      <div className="separator-line-footer"></div>
      <Footer />
    </>
  );
}

export default App;
