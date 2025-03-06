import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMode } from "../contexts/ModeContext";
import { useAuth } from "../contexts/AuthContext";
import "./../styles/navbar.css";

const Header = () => {
  const { darkMode, toggleDarkMode } = useMode();
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await fetch("https://web.ics.purdue.edu/~tdoshi/test/logout.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (data.message) {
        logout(); // Use the context's logout function
        navigate("/");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please check your connection and try again.");
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <img src="/my-react-app/favicon-32x32.png" alt="Logo" className="nav-logo" />
          <span className="nav-title">Profile Directory</span>
        </div>
        
        <div className="nav-right">
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
            {isLoggedIn && (
              <Link to="/add-profile" className={`nav-link ${location.pathname === '/add-profile' ? 'active' : ''}`}>
                Add Profile
              </Link>
            )}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            ) : (
              <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>
                Login
              </Link>
            )}
          </div>
          <button 
            onClick={toggleDarkMode} 
            className="mode-toggle"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

