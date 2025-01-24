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
    logout: (state, action) => {
      state.token = null;
      state.user = null;
      state.username = null
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username')
    },
    register: (state, action) => {
      const {username, password} = action.payload
    }
  },
});

export const { login, logout, register } = authSlice.actions; // Export actions
export default authSlice.reducer; // Export reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentUsername = (state) => state.auth.username
export const selectCurrentToken = (state) => state.auth.token