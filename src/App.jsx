import React from "react";
import "./App.css";

function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <a href="#home" style={styles.navLink}>
          Home
        </a>
        <a href="#about" style={styles.navLink}>
          About
        </a>
        <a href="#profiles" style={styles.navLink}>
          Profiles
        </a>
      </nav>
      <h1 style={styles.title}>Profile App</h1>
    </header>
  );
}

function Introduction() {
  return (
    <section style={styles.introduction}>
      <h2>About</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </section>
  );
}

function App() {
  return (
    <div style={styles.app}>
      <Header />
      <Introduction />
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: "#2E2E2E", // Dark grey background
    color: "white",
    minHeight: "100vh",
    margin: 0,
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#5A5DF4", // Blue header background
    padding: "1rem",
    textAlign: "center",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: "bold",
  },
  introduction: {
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#3B3B3B", // Slightly lighter grey for the introduction section
    borderRadius: "8px",
    margin: "2rem auto",
    width: "80%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
};

export default App;
