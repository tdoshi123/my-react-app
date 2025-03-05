import React, { useRef, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/card.css";

function Card({ id, image, name, role, bio, email }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState('auto');
  const [isExpanded, setIsExpanded] = useState(false);
  
  useLayoutEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.getBoundingClientRect().height;
      if (height > 400 && !isExpanded) {
        setCardHeight('400px');
      }
    }
  }, [bio, isExpanded]);

  const handleClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    setCardHeight(isExpanded ? '400px' : 'auto');
  };

  return (
    <div 
      ref={cardRef}
      className="profile-card" 
      onClick={handleClick}
      style={{ 
        cursor: 'pointer',
        height: cardHeight,
        overflow: 'hidden',
        transition: 'height 0.3s ease-in-out'
      }}
    >
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <p className="bio">{bio}</p>
      <p className="email">{email}</p>
      {cardHeight === '400px' && (
        <button 
          onClick={handleExpand}
          className="expand-button"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
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
