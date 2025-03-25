import React from 'react';
import { Link } from "react-router-dom";
import Card from "./card";
import Wrapper from "./wrapper";

const ProfileList = React.memo(({ profiles }) => (
    <Wrapper>
        {profiles.map((card) => (
            <Link 
                to={`/profile/${card.id}`} 
                key={card.id}
                style={{ textDecoration: 'none' }}
            >
                <Card
                    id={card.id}
                    image={card.image_url}
                    name={card.name}
                    role={card.title}
                    bio={card.bio}
                    email={card.email}
                />
            </Link>
        ))}
    </Wrapper>
));

ProfileList.displayName = 'ProfileList';
export default ProfileList;