import React, { useState } from "react";
import "./App.css";

function Header() {
  return (
    <header style={styles.header}>
      <h1>Welcome to Tirth Doshi's Profile</h1>
    </header>
  );
}

function Introduction() {
  return (
    <section style={styles.introduction}>
      <h2>About Me</h2>
      <p>
        Hi, I'm Tirth Doshi! I enjoy coding, learning about new technologies,
        and building awesome projects. Explore the cards below to learn more
        about me.
      </p>
    </section>
  );
}

function Card({ title, description }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  const cardsData = [
    { title: "Skills", description: "JavaScript, React, and more." },
    { title: "Hobbies", description: "Reading, Coding, and Traveling." },
    { title: "Contact", description: "Email: tirth@example.com" },
  ];

  return (
    <>
      <Header />
      <Introduction />
      <section style={styles.cardsContainer}>
        {cardsData.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} />
        ))}
      </section>
    </>
  );
}

const styles = {
  header: {
    padding: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "center",
  },
  introduction: {
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    marginBottom: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    margin: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "1rem",
  },
};

export default App;