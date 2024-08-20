// src/components/HeaderComponent.js
import React, { useState } from "react";
import "../Styles/HeaderComponent.scss"; // Import the CSS file

const HeaderComponent = ({ onSearch }) => {
  const [searchVal, setSearchVal] = useState("");
  const handleSearch = (input) => {
    setSearchVal(input);
    onSearch(input);
  };
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title rainbow-text">MOVIEW</h1>
        <div className="header-icons">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchVal}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <i className="fas fa-user-circle user-icon"></i>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
