import React from "react";
import { Link } from "react-router-dom";
import "./../styles/navbar.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/add-profile" className="nav-link">Add Profile</Link>
      </nav>
    </header>
  );
};

export default Header;