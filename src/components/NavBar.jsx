import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function NavBar({ onSearch, onNavigate, user, onSignInClick, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on navigation
  const handleNavClick = (page) => {
    setMenuOpen(false);
    onNavigate(page);
  };
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
        <h1
          className="brand"
          style={{ fontSize: "40px", marginRight: "3.5rem" }}
        >
          <span className="clipper-cut-emoji" size={55}>
            🎬
          </span>{" "}
          Movie Watch
        </h1>
        {/* Hamburger menu icon for mobile */}
        <button
          className="hamburger-menu"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "3.5rem",
            padding: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 28,
              height: 28,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 6,
                left: 3,
                width: 22,
                height: 3,
                background: "#222",
                borderRadius: 2,
                transition: "0.3s",
                transform: menuOpen
                  ? "rotate(45deg) translate(4px, 4px)"
                  : "none",
              }}
            ></span>
            <span
              style={{
                position: "absolute",
                top: 13,
                left: 3,
                width: 22,
                height: 3,
                background: "#222",
                borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: "0.3s",
              }}
            ></span>
            <span
              style={{
                position: "absolute",
                top: 20,
                left: 3,
                width: 22,
                height: 3,
                background: "#222",
                borderRadius: 2,
                transition: "0.3s",
                transform: menuOpen
                  ? "rotate(-45deg) translate(4px, -4px)"
                  : "none",
              }}
            ></span>
          </span>
        </button>
        {/* Nav links, show/hide for mobile */}
        <nav
          className={`main-nav${menuOpen ? " main-nav-open" : ""}`}
          style={{
            ...(menuOpen
              ? {
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "rgba(255,255,255,0.98)",
                  zIndex: 2000,
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem 0",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }
              : {}),
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
          >
            Home
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("movies");
            }}
          >
            Movies
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("coming");
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
