const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  try {
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    if (Array.isArray(data.results)) {
      // Map TMDb results to OMDb-like format for compatibility
      // Filter out movies without posters
      return data.results
        .filter((movie) => movie.poster_path)
        .map((movie) => ({
          imdbID: movie.id,
          Title: movie.title,
          Year: movie.release_date ? movie.release_date.slice(0, 4) : "",
          Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    if (Array.isArray(data.results)) {
      // Map TMDb results to OMDb-like format for compatibility
      // Filter out movies without posters
      return data.results
        .filter((movie) => movie.poster_path)
        .map((movie) => ({
          imdbID: movie.id,
          Title: movie.title,
          Year: movie.release_date ? movie.release_date.slice(0, 4) : "",
          Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();

    // Fetch videos for the movie
    const videosUrl = `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}`;
    const videosResponse = await fetch(videosUrl);
    let trailerKey = null;
    if (videosResponse.ok) {
      const videosData = await videosResponse.json();
      const youtubeTrailer = videosData.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      if (youtubeTrailer) {
        trailerKey = youtubeTrailer.key;
      }
    }

    // Map TMDb details to OMDb-like format for compatibility
    return {
      imdbID: data.id,
      Title: data.title,
      Year: data.release_date ? data.release_date.slice(0, 4) : "",
      Poster: data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "/placeholder-poster.jpg",
      Plot: data.overview,
      Genre: data.genres ? data.genres.map((g) => g.name).join(", ") : "",
      Rating: data.vote_average,
      Runtime: data.runtime,
      Trailer: trailerKey,
      ...data,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
