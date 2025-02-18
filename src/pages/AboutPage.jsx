import React from "react";
import Introduction from "../components/introduction";

const AboutPage = () => {
  const introContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
  return (
    <div>
      <h1>About Page</h1>
      <Introduction heading="About" content={introContent} />
    </div>
  );
};

export default AboutPage;