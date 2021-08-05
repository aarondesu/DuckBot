import { configureStore } from '@reduxjs/toolkit';

import Auth from './auth';
import Discord from './discord';

const store = configureStore({
  reducer: {
    auth: Auth,
    discord: Discord,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
