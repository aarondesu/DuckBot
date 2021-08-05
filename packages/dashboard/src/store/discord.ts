/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiscordState {
  discordId: string;
}

const initialState: DiscordState = {
  discordId: '',
};

const discord = createSlice({
  name: 'discord',
  initialState,
  reducers: {
    setDiscordId(state, action: PayloadAction<string>) {
      state.discordId = action.payload;
    },
  },
});

export const { setDiscordId } = discord.actions;
export default discord.reducer;
