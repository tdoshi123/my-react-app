import React, { useState, useEffect } from "react";
import Wrapper from "../components/wrapper";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";

const ProfileDetailPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const isEditMode = location.pathname.endsWith('/edit');

  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~tdoshi/test/fetch-data-with-id.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [id]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <Wrapper>
        {!profile ? (
            <p>Loading...</p>
        ) : (
            <>
                <h1>{profile.name}'s Profile</h1>
                <p>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
                <p>{profile.bio}</p>
                <img src={profile.image_url} alt={profile.name} />
                <Link to='edit'>Edit</Link>
            </>
        )}
    </Wrapper>
  );
};

export default ProfileDetailPage;
