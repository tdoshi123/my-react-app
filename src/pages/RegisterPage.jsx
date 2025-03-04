import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("action", "register");

    try {
      const response = await fetch("https://web.ics.purdue.edu/~tdoshi/test/auth.php", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      
      try {
        const data = JSON.parse(text);
        if (data.success) {
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("username", username);
          alert(data.success);
          navigate("/");
        } else {
          alert(data.error || "Registration failed");
        }
      } catch (jsonError) {
        console.error("Server response:", text);
        alert("Registration failed. The server returned an invalid response. Please try again later.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please check your connection and try again.");
    }
  };

  return (
    <>
      <h1>Register</h1>
      <div className="register-container">
        <form onSubmit={handleRegister}>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
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
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
