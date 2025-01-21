import React from "react";
import "./../styles/introduction.css";

const Introduction = ({ heading, content }) => {
  return (
    <section className="introduction">
      <h2 className="intro-heading">{heading}</h2>
      <p className="intro-paragraph">{content}</p>
    </section>
  );
};

export default Introduction;