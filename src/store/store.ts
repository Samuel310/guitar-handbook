import { configureStore } from "@reduxjs/toolkit";
import songBookReducer from "./slice/songBookSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    songBook: songBookReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
