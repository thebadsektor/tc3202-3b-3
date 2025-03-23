import React, { useState } from 'react';
import './SearchBox.css';
import {FaSearch} from "react-icons/fa"

const SearchBox = () => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query) {
      window.location.href = `https://www.google.com/search?q=${query}`;
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search or type a URL"
          className="search-input"
        />
        <FaSearch id="search-icon" />
      </form>
    </div>
  );
};

export default SearchBox;
