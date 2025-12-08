import { configureStore } from '@reduxjs/toolkit';
import songBookReducer from './features/songBook/songBookSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    songBook: songBookReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
