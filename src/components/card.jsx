import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/card.css";

function Card({ id, image, name, role, bio, email }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Card clicked! ID:", id);
    navigate(`/profile/${id}`);
  };

  return (
    <div 
      className="profile-card" 
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <p className="bio">{bio}</p>
      <p className="email">{email}</p>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Card;
