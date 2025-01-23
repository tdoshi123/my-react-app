import React from "react";
import PropTypes from "prop-types";
import "../styles/card.css";

function Card({ image, name, role, email }) {
  return (
    <div className="profile-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <p className="email">{email}</p>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Card;