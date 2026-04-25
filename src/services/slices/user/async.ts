import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';

import { TUser } from '@utils-types';
import { setCookie } from '@cookies';

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/registerUser',
  async (data) => {
    const response = await registerUserApi(data);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/loginUser',
  async (data) => {
    const response = await loginUserApi(data);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();

  setCookie('accessToken', '', { expires: 0 });
  localStorage.removeItem('refreshToken');
});

export const fetchUser = createAsyncThunk<TUser>('user/fetchUser', async () => {
  const response = await getUserApi();

  return response.user;
});

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUser',
  async (data) => {
    const response = await updateUserApi(data);

    return response.user;
  }
);
