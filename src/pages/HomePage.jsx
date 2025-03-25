import React, { useReducer, useCallback, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/wrapper";
import Card from "../components/card";
import { useProfiles } from "../hooks/useProfiles";

// Lazy load components
const FilterSection = lazy(() => import("../components/FilterSection"));
const ProfileList = lazy(() => import("../components/ProfileList"));
const Pagination = lazy(() => import("../components/Pagination"));

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

const HomePage = React.memo(({ titles }) => {
    const [filterState, dispatch] = useReducer(filterReducer, {
        selectedRole: "",
        searchQuery: "",
        page: 1
    });
    
    const { profiles, loading, error } = useProfiles(
      filterState.selectedRole, 
      filterState.searchQuery
    );

    const cardsPerPage = 3;
    const paginationData = useMemo(() => {
        const totalPages = Math.ceil(profiles.length / cardsPerPage);
        const startIndex = (filterState.page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const currentProfiles = profiles.slice(startIndex, endIndex);
        return { totalPages, currentProfiles };
    }, [profiles, filterState.page]);

    const handleClear = useCallback(() => {
        dispatch({ type: 'RESET_FILTERS' });
    }, []);

    const handleNext = useCallback(() => {
        if (filterState.page < paginationData.totalPages) {
            dispatch({ type: 'SET_PAGE', payload: filterState.page + 1 });
        }
    }, [filterState.page, paginationData.totalPages]);

    const handleBack = useCallback(() => {
        if (filterState.page > 1) {
            dispatch({ type: 'SET_PAGE', payload: filterState.page - 1 });
        }
    }, [filterState.page]);

    const handleRoleChange = useCallback((e) => {
        dispatch({ type: 'SET_ROLE', payload: e.target.value });
    }, []);

    const handleSearchChange = useCallback((e) => {
        dispatch({ type: 'SET_SEARCH', payload: e.target.value });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Home</h1>
            <Suspense fallback={<div>Loading filters...</div>}>
                <FilterSection 
                    filterState={filterState}
                    titles={titles}
                    onRoleChange={handleRoleChange}
                    onSearchChange={handleSearchChange}
                    onClear={handleClear}
                />
            </Suspense>

            <Suspense fallback={<div>Loading profiles...</div>}>
                <ProfileList profiles={paginationData.currentProfiles} />
            </Suspense>

            <Suspense fallback={<div>Loading pagination...</div>}>
                <Pagination 
                    page={filterState.page}
                    totalPages={paginationData.totalPages}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            </Suspense>
        </div>
    );
});

HomePage.displayName = 'HomePage';

export default HomePage;
