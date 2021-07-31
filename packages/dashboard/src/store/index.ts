import { configureStore } from '@reduxjs/toolkit';

import Auth from './auth';

const store = configureStore({
  reducer: {
    auth: Auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
