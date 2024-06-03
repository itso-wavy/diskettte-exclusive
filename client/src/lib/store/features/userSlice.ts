import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@/lib/types';
import { setLogin, setLogout } from './authSlice';

const initialState: UserState = {
  profile: {
    nickname: '',
    image: null,
    description: null,
  },
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Pick<UserState, 'profile'>>) => {
      state.profile = action.payload.profile;
    },
    removeProfile: state => {
      state.profile = initialState.profile;
    },
  },
  extraReducers: builder => {
    builder.addCase(setLogin, (state, action) => {
      if (action.payload.profile) state.profile = action.payload.profile;
    });
    builder.addCase(setLogout, state => {
      state.profile = initialState.profile;
    });
  },
});

const { setProfile, removeProfile } = userSlice.actions;
const userReducer = userSlice.reducer;

export { userReducer, setProfile, removeProfile };
