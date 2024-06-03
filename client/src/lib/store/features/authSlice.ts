import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, UserProfile } from '@/lib/types';

const initialState: AuthState = {
  userId: null,
  isLoggedIn: false,
  accessToken: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{
        token: string;
        profile?: UserProfile;
      }>
    ) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.token;
    },
    setLogout: state => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

const { setLogin, setLogout } = authSlice.actions;
const authReducer = authSlice.reducer;

export { authReducer, setLogin, setLogout };
