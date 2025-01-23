import React from "react";
import PropTypes from "prop-types";

const ContactUs = ({ heading, message }) => {
  return (
    <div className="contact-us">
      <h2>{heading}</h2>
      <p>{message}</p>
    </div>
  );
};

ContactUs.defaultProps = {
  heading: "Contact Us",
  message: "Feel free to reach out to us anytime!",
};

ContactUs.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string,
};

export default ContactUs;