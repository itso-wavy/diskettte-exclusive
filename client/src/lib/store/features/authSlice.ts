import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, UserProfile } from '@/lib/types';

const initialState: AuthState = {
  username: '',
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
        username?: string;
        token: string;
        profile?: UserProfile;
      }>
    ) => {
      state.username = action.payload.username || state.username;
      state.isLoggedIn = true;
      state.accessToken = action.payload.token;
    },
    setLogout: state => {
      state.username = '';
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

const { setLogin, setLogout } = authSlice.actions;
const authReducer = authSlice.reducer;

export { authReducer, setLogin, setLogout };
