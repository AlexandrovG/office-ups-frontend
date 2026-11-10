import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import upsReducer from './slices/upsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ups: upsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;