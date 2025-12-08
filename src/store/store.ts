import { configureStore } from '@reduxjs/toolkit';
import songBookReducer from './features/songBook/songBookSlice';

export const store = configureStore({
  reducer: {
    songBook: songBookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
