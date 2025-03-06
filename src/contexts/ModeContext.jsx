import { createContext, useState, useEffect, useContext } from 'react';

export const ModeContext = createContext();

// Custom hook to use the mode context
export const useMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ModeContext.Provider>
  );
};
