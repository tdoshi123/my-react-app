import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModeContext } from "../contexts/ModeContext";
import "./../styles/navbar.css";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ModeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin") === "true";
  
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
        localStorage.removeItem("isLogin");
        localStorage.removeItem("username");
        navigate("/");
      } else {
        alert("Logout failed. Please try again."); // Keep error alerts for failed logout attempts
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please check your connection and try again."); // Keep error alerts for failed logout attempts
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <img src="/my-react-app/favicon-32x32.png" alt="Logo" className="nav-logo" />
          <span className="nav-title">Home</span>
        </div>
        
        <div className="nav-right">
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
            {isLogin && (
              <Link to="/add-profile" className={`nav-link ${location.pathname === '/add-profile' ? 'active' : ''}`}>
                Add Profile
              </Link>
            )}
            {isLogin ? (
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

