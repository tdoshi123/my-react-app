import React, { useState } from "react";
import "./app.css";
import Header from "./components/header";
import Introduction from "./components/introduction";
import Wrapper from "./components/wrapper";
import Card from "./components/card";
import ContactUs from "./components/contactus";
import johnDoeImage from "./assets/images/no-dp_16.webp";

function App() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#profiles", label: "Profile" },
  ];

  const introContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const cardData = [
    {
      image: johnDoeImage,
      name: "John Doe",
      role: "Web Developer",
      email: "john.doe@example.com",
    },
    {
      image: johnDoeImage,
      name: "Eva Smith",
      role: "UX Designer",
      email: "eva.smith@example.com",
    },
    {
      image: johnDoeImage,
      name: "Tirth Doshi",
      role: "Student",
      email: "tdoshi@purdue.edu",
    },
    {
      image: johnDoeImage,
      name: "Billy Bob",
      role: "Student",
      email: "bbob@purdue.edu",
    },
  ];

  const [selectedRole, setSelectedRole] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCards = cardData
    .filter((card) =>
      selectedRole === "All" ? true : card.role === selectedRole
  )
    .filter((card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClear = () => {
    setSelectedRole("All");
    setSearchQuery("");
  };

  return (
    <div className="app">
      <Header links={navLinks} />
      <h1 className="title">Profile App</h1>
      <Introduction heading="About" content={introContent} />

      <Wrapper>
        <div className="filter-container">
          <label htmlFor="role-filter">Filter by Role:</label>
          <select
            id="role-filter"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Web Developer">Web Developer</option>
            <option value="UX Designer">UX Designer</option>
            <option value="Student">Student</option>
          </select>
          <label htmlFor="name-search" className="search-label">
            Search for Name:
          </label>
          <input
            id="name-search"
            type="text"
            placeholder="Enter name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-box"
          />
          <button onClick={handleClear} className="reset-button">Reset</button>
        </div>
      </Wrapper>

      <Wrapper>
        {filteredCards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            name={card.name}
            role={card.role}
            email={card.email}
          />
        ))}
      </Wrapper>

      <Wrapper>
        <ContactUs
          heading="Contact Us"
          message="We'd love to hear any suggestions from our loyal customers! Please reach out to tdoshi@purdue.edu concerning any inquiries."
        />
      </Wrapper>
    </div>
  );
}

export default App;