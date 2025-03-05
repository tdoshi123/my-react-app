import React, { useState, useEffect } from "react";
import Wrapper from "../components/wrapper";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/profiledetail.css";

const ProfileDetailPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin") === "true";

  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~tdoshi/test/fetch-data-with-id.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [id]);

  const handleEditClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      navigate('/login', { state: { from: `${location.pathname}/edit` } });
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-detail-container">
      <h1 className="profile-detail-title">{profile.name}'s Profile</h1>
      <div className="profile-detail-content">
        <div className="profile-image-container">
          <img src={profile.image_url} alt={profile.name} className="profile-detail-image" />
        </div>
        <div className="profile-info-container">
          <a href={`mailto:${profile.email}`} className="profile-email">{profile.email}</a>
          <p className="profile-bio">{profile.bio}</p>
          <Link to="edit" className="edit-profile-button" onClick={handleEditClick}>
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;
