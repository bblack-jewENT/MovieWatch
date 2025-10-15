import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function NavBar({ onSearch, onNavigate, user, onSignInClick, onSignOut }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSignInClick = () => {
    onSignInClick();
  };

  return (
    <>
      <header
        className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}
      >
        <div className="navbar-left">
          <h1 className="brand">
            <span className="clipper-cut-emoji">🎬</span> Movie Watch
          </h1>
        </div>

        <div className="navbar-center" />

        <div className="navbar-right">
          <nav className="main-nav">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home");
              }}
            >
              Home
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("movies");
              }}
            >
              Movies
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("coming");
              }}
            >
              Coming
            </a>
          </nav>

          <SearchBar onSearch={onSearch} />

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ color: "var(--text-color)", fontSize: "0.9rem" }}>
                Welcome, {user.email}
              </span>
              <button className="sign-in-button" onClick={onSignOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <button className="sign-in-button" onClick={handleSignInClick}>
              Sign In
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default NavBar;
