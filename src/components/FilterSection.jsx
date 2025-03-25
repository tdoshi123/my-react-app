import React from 'react';

const FilterSection = React.memo(({ filterState, titles, onRoleChange, onSearchChange, onClear }) => (
    <div className="filter-container">
        <label htmlFor="role-filter">Filter by Role:</label>
        <select
            id="role-filter"
            value={filterState.selectedRole}
            onChange={onRoleChange}
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
            onChange={onSearchChange}
            className="search-box"
        />
        <button onClick={onClear} className="reset-button">Reset</button>
    </div>
));

FilterSection.displayName = 'FilterSection';
export default FilterSection;