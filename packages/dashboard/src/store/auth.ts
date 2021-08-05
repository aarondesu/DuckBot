/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserDetails } from '../types/user';

interface AuthState {
  user: UserDetails | undefined;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: undefined,
  isLoading: true,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDetails>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = undefined;
      state.isLoading = false;
    },
  },
});

export const { setUser, logout } = auth.actions;
export default auth.reducer;
