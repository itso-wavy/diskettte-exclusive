import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '.';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
