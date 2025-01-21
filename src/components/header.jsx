import React from "react";

const Header = ({ title, links }) => {
  return (
    <header className="header" style={styles.header}>
      <nav className="nav" style={styles.nav}>
        {links.map((link, index) => (
          <a key={index} href={link.href} className="nav-link" style={styles.navLink}>
            {link.label}
          </a>
        ))}
      </nav>
      <h1 className="title" style={styles.title}>{title}</h1>
    </header>
  );
};

// Inline styles (fallback if no CSS classes)
const styles = {
  header: {
    backgroundColor: "#5A5DF4",
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
};

export default Header;