import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileForm from "../components/profileform";
import "../styles/profileform.css";

const ProfileEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
        fetch(`https://web.ics.purdue.edu/~tdoshi/test/delete-profile.php?id=${id}`, {
            method: "delete",
        })
        .then((rep) => rep.json())
        .then(data => {
            console.log(data);
            if(data.message) {
                alert("Profile Deleted Successfully");
                navigate("/");
            } else {
                alert("Failed to delete profile");
            }
        });
    }
  };

useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~tdoshi/test/fetch-data-with-id.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
        setProfile(data);
        console.log(data);
    });
}, [])

  return (
    <div>
      <h1>Edit Profile Page</h1>
      <button onClick={handleDelete}>Delete Profile</button>
      <ProfileForm profile={profile} edit={true} />
    </div>
  );
};

export default ProfileEditPage;
