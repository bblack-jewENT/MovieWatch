import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const handleIconClick = (e) => {
    // If there's text -> perform search
    if (searchTerm.trim().length > 0) {
      onSearch && onSearch(searchTerm.trim());
    }
  };

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length > 0) {
      onSearch && onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          ref={inputRef}
          aria-label="Search movies"
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleChange}
        />

        <button
          type="button"
          aria-label={searchTerm ? "Submit search" : "Search"}
          className="search-toggle"
          onClick={handleIconClick}
        >
          <FaSearch className="search-icon" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
