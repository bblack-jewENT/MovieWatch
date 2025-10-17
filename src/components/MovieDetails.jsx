import React from "react";

function MovieDetails({ movie, onBack }) {
  if (!movie) {
    return (
      <div className="movie-details-loading">Loading movie details...</div>
    );
  }

  return (
    <div className="movie-details">
      <button className="back-button" onClick={onBack}>
        ← Back to Search
      </button>
      <div className="movie-details-content" style={{ marginLeft: "auto" }}>
        <div
          className="movie-details-poster-container"
          style={{ position: "relative", width: "200px", height: "300px" }}
        >
          <img
            src={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "/placeholder-poster.jpg"
            }
            alt={`${movie.Title} poster`}
            className="movie-details-poster"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          {movie.Trailer && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movie.Trailer}`}
              title={`${movie.Title} trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                zIndex: 2,
                background: "rgba(0,0,0,0.7)",
              }}
            ></iframe>
          )}
        </div>
        <div className="movie-details-info">
          <h1 className="movie-details-title">{movie.Title}</h1>
          <p className="movie-details-year">{movie.Year}</p>
          <p className="movie-details-genre">
            <strong>Genre:</strong>{" "}
            {movie.Genre ||
              (movie.genres
                ? movie.genres.map((g) => g.name).join(", ")
                : "N/A")}
          </p>
          <p className="movie-details-plot">
            <strong>Plot:</strong> {movie.Plot || movie.overview || "N/A"}
          </p>
          <p className="movie-details-cast">
            <strong>Cast:</strong> {movie.Actors || "N/A"}
          </p>
          <div className="movie-details-ratings">
            <h3>Rating:</h3>
            <ul>
              <li>
                <strong>TMDb:</strong>{" "}
                {movie.vote_average || movie.Rating || "N/A"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
