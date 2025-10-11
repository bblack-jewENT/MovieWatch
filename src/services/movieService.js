const TMDB_API_KEY = "9b268815e6f5ab4d1b758f036ee379ce"; // TMDb API key for production
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
      return data.results.map((movie) => ({
        imdbID: movie.id,
        Title: movie.title,
        Year: movie.release_date ? movie.release_date.slice(0, 4) : "",
        Poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/placeholder-poster.jpg",
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
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
      ...data,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
