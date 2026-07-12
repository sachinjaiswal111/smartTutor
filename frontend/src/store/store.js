import { configureStore } from "@reduxjs/toolkit";
import authRedcer from '../features/auth/authSlice.js'

export const store = configureStore({
  reducer: {
    auth:authRedcer
  },
});