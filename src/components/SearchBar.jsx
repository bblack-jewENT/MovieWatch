import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleIconClick = (e) => {
    // If input is not open -> open it
    if (!open) {
      setOpen(true);
      return;
    }

    // If open and there's text -> perform search
    if (searchTerm.trim().length > 0) {
      onSearch && onSearch(searchTerm.trim());
      return;
    }

    // If open and empty -> close it
    setOpen(false);
  };

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length > 0) {
      onSearch && onSearch(searchTerm.trim());
    } else {
      // Nothing to search -> collapse input
      setOpen(false);
    }
  };

  return (
    <div className={`search-wrapper ${open ? "open" : "closed"}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          ref={inputRef}
          aria-label="Search movies"
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleChange}
          style={{ width: open ? "180px" : "0px" }}
        />

        <button
          type="button"
          aria-label={
            open
              ? searchTerm
                ? "Submit search"
                : "Close search"
              : "Open search"
          }
          className="search-toggle"
          onClick={handleIconClick}
        >
          {/* Show search icon; when open and there is text we'll keep the icon but clicking will submit */}
          <FaSearch className="search-icon" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
