import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userId, token, refreshToken } = action.payload;
      state.userId = userId;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = !!token;

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    },
    logout: (state) => {
      // state.userId = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
