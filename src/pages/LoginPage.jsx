import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../styles/auth.css";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("action", "login");

    try {
      const response = await fetch("https://web.ics.purdue.edu/~tdoshi/test/auth.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        login({ username }); // Use the context's login function
        navigate(location.state?.from || "/");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
