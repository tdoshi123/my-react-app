import React from "react";
import "./styles/app.css";
import Header from "./components/header";
import Introduction from "./components/introduction";

function App() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#profiles", label: "Profiles" },
  ];

  const introContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <div className="app">
      <Header links={navLinks} />
      <h1 className="title">Profile App</h1>
      <Introduction heading="About" content={introContent} />
    </div>
  );
}
export default App;