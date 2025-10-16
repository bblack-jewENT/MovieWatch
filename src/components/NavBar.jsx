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
    <header
      className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}
    >
      <div className="navbar-content-centered">
        <h1 className="brand" style={{ fontSize: "40px" }}>
          <span className="clipper-cut-emoji" size={55}>
            🎬
          </span>{" "}
          Movie Watch
        </h1>
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
          <div className="user-info-circle">
            <span title={user.email}>
              {user.email.slice(0, 2).toUpperCase()}
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
  );
}

export default NavBar;
