import { createSlice } from "@reduxjs/toolkit";

const initialDarkMode = localStorage.getItem('darkMode') !== null 
  ? JSON.parse(localStorage.getItem('darkMode')) 
  : true;

document.body.className = initialDarkMode ? 'dark-mode' : 'light-mode';

const initialState = {
  darkMode: initialDarkMode
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      document.body.className = state.darkMode ? 'dark-mode' : 'light-mode';
    }
  }
});

export const { toggleDarkMode } = modeSlice.actions;
export default modeSlice.reducer;
