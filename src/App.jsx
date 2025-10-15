import "./App.css";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import MoviesPage from "./components/MoviesPage";
import ComingSoonPage from "./components/ComingSoonPage";
import Footer from "./components/Footer";
import SignInModal from "./components/SignInModal";
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
  const [user, setUser] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
    setHasSearched(true);
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

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };

  const handleAuthSuccess = (user) => {
    setUser(user);
    setShowSignInModal(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <NavBar
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        user={user}
        onSignInClick={handleSignInClick}
        onSignOut={handleSignOut}
      />
      {currentPage === "home" && (
        <main className="main-content">
          {loading ? (
            <div className="loading">
              <div className="loading-animation">
                <div className="film-reel">
                  <div className="reel-hole"></div>
                  <div className="reel-hole"></div>
                  <div className="reel-hole"></div>
                </div>
              </div>
              <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
                Loading movies...
              </div>
            </div>
          ) : hasSearched && error ? (
            <div className="error">{error}</div>
          ) : selectedMovie ? (
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
      )}
      {currentPage === "movies" && (
        <>
          {selectedMovie ? (
            <MovieDetails movie={selectedMovie} onBack={handleBack} />
          ) : (
            <MoviesPage onSelectMovie={handleSelectMovie} />
          )}
        </>
      )}
      {currentPage === "coming" && <ComingSoonPage />}
      <div className="separator-line-footer"></div>
      <Footer />
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default App;
