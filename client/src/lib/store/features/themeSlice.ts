import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme, ThemeState } from '@/lib/types';

const initialState: ThemeState = {
  theme: 'orange',
  isDarkmode: false,
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setDarkmode: (state, action: PayloadAction<boolean>) => {
      state.isDarkmode = action.payload;
    },
  },
});

const { setTheme, setDarkmode } = themeSlice.actions;
const themeReducer = themeSlice.reducer;

export { themeReducer, setTheme, setDarkmode };
