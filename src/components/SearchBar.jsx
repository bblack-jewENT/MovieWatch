import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import the desired search icon

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    onSearch(searchTerm); // Call the parent component's search handler
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <FaSearch className="search-icon" />
      </button>
    </form>
  );
}

export default SearchBar;
