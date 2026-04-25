import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './async';
import { TUserState } from './type';

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginError: null,
  registerError: null,
  updateError: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginError = null;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.error.message || 'Ошибка регистрации';
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loginError = null;
        state.registerError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message || 'Ошибка входа';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.data = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateError = action.error.message || 'Ошибка обновления данных';
      });
  }
});
