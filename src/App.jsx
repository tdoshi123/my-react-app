import React, { useState, useEffect, useContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AddProfile from "./pages/AddProfile";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileLayoutPage from "./pages/ProfileLayoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ModeContext } from "./contexts/ModeContext";
import "./app.css";

function App() {
  const [titles, setTitles] = useState([]);
  const { darkMode, toggleDarkMode } = useContext(ModeContext);

  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~tdoshi/test/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
        setTitles(data.titles);
      });
  }, []);

  return (
    <HashRouter>
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage titles={titles}/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-profile" element={
            <ProtectedRoute>
              <AddProfile />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="profile/:id" element={<ProfileLayoutPage />} >
            <Route index element={<ProfileDetailPage />} />
            <Route path="edit" element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
