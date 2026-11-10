import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userID: number | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  userID: localStorage.getItem('userID') ? Number(localStorage.getItem('userID')) : null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ userID: number; token: string }>) => {
      state.isAuthenticated = true;
      state.userID = action.payload.userID;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userID', String(action.payload.userID));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userID = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;