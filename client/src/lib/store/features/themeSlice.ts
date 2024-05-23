import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'orange',
  isDarkmode: true,
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setDarkmode: (state, action) => {
      state.isDarkmode = action.payload;
    },
  },
});

const { setTheme, setDarkmode } = themeSlice.actions;
const themeReducer = themeSlice.reducer;

export { themeReducer, setTheme, setDarkmode };
