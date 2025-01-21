import React from "react";

const Introduction = ({ heading, content }) => {
  return (
    <section className="introduction" style={styles.introduction}>
      <h2 className="intro-heading" style={styles.heading}>{heading}</h2>
      <p className="intro-paragraph" style={styles.paragraph}>{content}</p>
    </section>
  );
};

const styles = {
  introduction: {
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#3B3B3B",
    borderRadius: "8px",
    margin: "2rem auto",
    width: "80%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.75",
  },
};

export default Introduction;