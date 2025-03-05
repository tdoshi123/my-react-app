import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/wrapper";
import Card from "../components/card";

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, selectedRole: action.payload, page: 1 };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, page: 1 };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'RESET_FILTERS':
      return { ...state, selectedRole: "", searchQuery: "", page: 1 };
    default:
      return state;
  }
};

const HomePage = ({ titles }) => {
    const [filterState, dispatch] = useReducer(filterReducer, {
        selectedRole: "",
        searchQuery: "",
        page: 1
    });
    const [profiles, setProfiles] = useState([]);
    const cardsPerPage = 3;

    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~tdoshi/test/fetch-data-with-filter.php?title=${filterState.selectedRole}&name=${filterState.searchQuery}&limit=20`)
            .then((res) => res.json())
            .then((data) => {
                setProfiles(data.profiles);
            });
    }, [filterState.selectedRole, filterState.searchQuery]);

    const handleClear = () => {
        dispatch({ type: 'RESET_FILTERS' });
    };

    const totalPages = Math.ceil(profiles.length / cardsPerPage);
    const startIndex = (filterState.page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentProfiles = profiles.slice(startIndex, endIndex);

    const handleNext = () => {
        if (filterState.page < totalPages) {
            dispatch({ type: 'SET_PAGE', payload: filterState.page + 1 });
        }
    };

    const handleBack = () => {
        if (filterState.page > 1) {
            dispatch({ type: 'SET_PAGE', payload: filterState.page - 1 });
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <div className="filter-container">
                <label htmlFor="role-filter">Filter by Role:</label>
                <select
                    id="role-filter"
                    value={filterState.selectedRole}
                    onChange={(e) => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
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
                    value={filterState.searchQuery}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
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
                <button onClick={handleBack} disabled={filterState.page === 1}>
                    Back
                </button>
                <span>
                    Page {filterState.page} of {totalPages}
                </span>
                <button onClick={handleNext} disabled={filterState.page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
