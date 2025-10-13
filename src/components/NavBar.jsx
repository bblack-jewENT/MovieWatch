import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SignInModal from "./SignInModal";

function NavBar({ onSearch, onNavigate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="navbar">
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
            <a href="#">Coming</a>
          </nav>

          <SearchBar onSearch={onSearch} />

          <button className="sign-in-button" onClick={handleSignInClick}>
            Sign in
          </button>
        </div>
      </header>
      <SignInModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default NavBar;
