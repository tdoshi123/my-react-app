import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/wrapper";
import Card from "../components/card";

const HomePage = ({ titles }) => {
    const [selectedRole, setSelectedRole] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const cardsPerPage = 3;

    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~tdoshi/test/fetch-data-with-filter.php?title=${selectedRole}&name=${searchQuery}&limit=20`)
            .then((res) => res.json())
            .then((data) => {
                setProfiles(data.profiles);
                setPage(1);
                console.log(data);
            });
    }, [selectedRole, searchQuery]);

    function handleClear() {
        setSelectedRole("");
        setSearchQuery("");
        setPage(1);
    }

    function changeRole(e) {
        setSelectedRole(e.target.value);
        setPage(1);
    }

    const totalPages = Math.ceil(profiles.length / cardsPerPage);
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentProfiles = profiles.slice(startIndex, endIndex);

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handleBack = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <h1>Home Page</h1>
            <div className="filter-container">
                <label htmlFor="role-filter">Filter by Role:</label>
                <select
                    id="role-filter"
                    value={selectedRole}
                    onChange={changeRole}
                >
                    <option value="">All</option>
                    {titles.map((card) => (
                        <option value={card} key={card}>{card}</option>
                    ))}
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
            <Wrapper>
                {currentProfiles.map((card) => (
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

            <div className="pagination">
                <button onClick={handleBack} disabled={page === 1}>
                    Back
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button onClick={handleNext} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
