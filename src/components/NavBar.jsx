import React from "react";
import SearchBar from "./SearchBar";

function NavBar({ onSearch }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="brand">🎬 Movie Watch</h1>
      </div>

      <div className="navbar-center" />

      <div className="navbar-right">
        <nav className="main-nav">
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">Coming</a>
        </nav>

        <SearchBar onSearch={onSearch} />

        <button className="sign-in-button">Sign in</button>
      </div>
    </header>
  );
}

export default NavBar;
