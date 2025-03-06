import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLogin') === 'true';
    });
    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || '';
    });

    const login = (userData) => {
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('username', userData.username);
        setIsLoggedIn(true);
        setUsername(userData.username);
    };

    const logout = () => {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};