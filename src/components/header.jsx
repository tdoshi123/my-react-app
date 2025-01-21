import React from "react";
import "./../styles/navbar.css";

const Header = ({ links }) => {
  return (
    <header className="header">
      <nav className="nav">
        {links.map((link, index) => (
          <a key={index} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;