import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ModeContext } from "../contexts/ModeContext";
import "./../styles/navbar.css";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ModeContext);
  
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/add-profile" className="nav-link">Add Profile</Link>
        </div>
        
        <button 
          onClick={toggleDarkMode} 
          className="mode-toggle"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </header>
  );
};

export default Header;

