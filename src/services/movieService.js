const API_KEY = "your_omdb_api_key_here"; // Get your free API key from http://www.omdbapi.com/
const BASE_URL = "http://www.omdbapi.com/";

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
