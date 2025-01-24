import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('user') || null,
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user, username } = action.payload;
      state.token = token;
      state.user = user;
      state.username = username;
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      localStorage.setItem('username', username);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.username = null
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username')
    },
  },
});

export const { login, logout } = authSlice.actions; // Export actions
export default authSlice.reducer; // Export reducer
