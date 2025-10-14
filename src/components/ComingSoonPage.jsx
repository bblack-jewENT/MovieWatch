import React from "react";
import { FaClock, FaFilm } from "react-icons/fa";

function ComingSoonPage() {
  return (
    <main className="main-content">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "1rem",
            opacity: "0.8",
          }}
        >
          <FaClock style={{ color: "var(--primary-color)" }} />
        </div>

        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            color: "var(--text-color)",
          }}
        >
          Coming Soon
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
            color: "var(--muted)",
            maxWidth: "600px",
            lineHeight: "1.6",
          }}
        >
          We're working hard to bring you exciting new features and content.
          Stay tuned for updates and be the first to know when we launch!
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1.1rem",
            color: "var(--primary-color)",
          }}
        >
          <FaFilm />
          <span>More movie magic coming your way...</span>
        </div>
      </div>
    </main>
  );
}

export default ComingSoonPage;
