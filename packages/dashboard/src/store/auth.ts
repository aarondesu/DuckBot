/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  discordId: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  discordId: '',
  isLoading: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    AUTHORIZE: (state, action: PayloadAction<string>) => {
      state.discordId = action.payload;
    },
  },
});

export const { AUTHORIZE } = auth.actions;
export default auth.reducer;
