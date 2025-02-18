import React, { useState, useEffect } from "react";
import "./app.css";
import Header from "./components/header";
import Introduction from "./components/introduction";
import Wrapper from "./components/wrapper";
import Card from "./components/card";
import ContactUs from "./components/contactus";
import johnDoeImage from "./assets/images/no-dp_16.webp";
import ProfileForm from "./components/profileform";

function App() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#profiles", label: "Profile" },
  ];

  const introContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~tdoshi/test/fetch-data.php")
    .then((res) => res.json())
    .then((data) => {
      setProfiles(data);
      console.log(data)
    })
  },[]);

  const [selectedRole, setSelectedRole] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCards = profiles
    .filter((card) =>
      selectedRole === "All" ? true : card.title === selectedRole
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
            <option value="Professor">Professor</option>
            <option value="Student">Student</option>
            <option value="TA">TA</option>
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
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            image={card.image_url}
            name={card.name}
            role={card.title}
            bio={card.bio}
            email={card.email}
          />
        ))}
      </Wrapper>
      
      <Wrapper>
        <ProfileForm />
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