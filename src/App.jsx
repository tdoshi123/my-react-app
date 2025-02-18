import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AddProfile from "./pages/AddProfile";
import NotFound from "./pages/NotFound";
import "./app.css";

function App() {
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~tdoshi/test/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
        setTitles(data.titles);
      });
  }, []);

  return (
    <HashRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage titles={titles}/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;