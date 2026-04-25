import { describe, expect, test } from '@jest/globals';
import { userSlice } from '../src/services/slices';
import {
  registerUser,
  loginUser,
  fetchUser,
  logoutUser,
  updateUser
} from '../src/services/slices';
import { TLoginData, TRegisterData } from '../src/utils/burger-api';
import { TUser } from '../src/utils/types';

const MOCK_USER: TUser = {
  email: 'test@email.com',
  name: 'Test Name'
};

const MOCK_REGISTER: TRegisterData = {
  email: 'test@email.com',
  name: 'Test Name',
  password: 'Test Password'
};

const MOCK_LOGIN: TLoginData = {
  email: 'test@email.com',
  password: 'Test Password'
};

const MOCK_UPDATE: Partial<TRegisterData> = {
  email: 'test@email_updated.com',
  name: 'Test Name Updated'
};

describe('userReducer', () => {
  describe('Получение информации об авторизации пользователя', () => {
    test('fetchUser.fulfilled', () => {
      const state = userSlice.reducer(
        userSlice.getInitialState(),
        fetchUser.fulfilled(MOCK_USER, 'fulfilled')
      );

      expect(state.data).toEqual(MOCK_USER);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    test('fetchUser.rejected', () => {
      const errorMessage =
        'Ошибка получения данных об авторизации пользователя';

      const state = userSlice.reducer(
        userSlice.getInitialState(),
        fetchUser.rejected(new Error(errorMessage), 'rejected')
      );

      expect(state.data).toBe(null);
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Регистрация', () => {
    test('registerUser.pending', () => {
      const state = userSlice.reducer(
        userSlice.getInitialState(),
        registerUser.pending('pending', MOCK_REGISTER)
      );

      expect(state.registerError).toBe(null);
    });

    test('registerUser.fulfilled', () => {
      const state = userSlice.reducer(
        userSlice.getInitialState(),
        registerUser.fulfilled(MOCK_USER, 'fulfilled', MOCK_REGISTER)
      );

      expect(state.registerError).toBe(null);
      expect(state.data).toEqual(MOCK_USER);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    test('registerUser.rejected', () => {
      const errorMessage = 'Ошибка регистрации';

      const state = userSlice.reducer(
        userSlice.getInitialState(),
        registerUser.rejected(
          new Error(errorMessage),
          'rejected',
          MOCK_REGISTER
        )
      );

      expect(state.registerError).toBe(errorMessage);
    });
  });

  describe('Авторизация', () => {
    test('loginUser.pending', () => {
      const state = userSlice.reducer(
        userSlice.getInitialState(),
        loginUser.pending('pending', MOCK_LOGIN)
      );

      expect(state.loginError).toBe(null);
    });

    test('loginUser.fulfilled', () => {
      const state = userSlice.reducer(
        userSlice.getInitialState(),
        loginUser.fulfilled(MOCK_USER, 'fulfilled', MOCK_LOGIN)
      );

      expect(state.loginError).toBe(null);
      expect(state.data).toEqual(MOCK_USER);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    test('loginUser.rejected', () => {
      const errorMessage = 'Ошибка входа';

      const state = userSlice.reducer(
        userSlice.getInitialState(),
        loginUser.rejected(new Error(errorMessage), 'rejected', MOCK_LOGIN)
      );

      expect(state.loginError).toBe(errorMessage);
    });
  });

  describe('Выход из аккаунта', () => {
    test('logoutUser.fulfilled', () => {
      const state = userSlice.reducer(
        userSlice.getInitialState(),
        logoutUser.fulfilled(undefined, 'fulfilled')
      );

      expect(state.data).toBe(null);
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Обновление данных пользователя', () => {
    test('updateUser.pending', () => {
      const state = userSlice.reducer(
        { ...userSlice.getInitialState(), data: MOCK_USER },
        updateUser.pending('pending', MOCK_UPDATE)
      );

      expect(state.updateError).toBe(null);
      expect(state.data).toEqual(MOCK_USER);
    });

    test('updateUser.fulfilled', () => {
      const state = userSlice.reducer(
        { ...userSlice.getInitialState(), data: MOCK_USER },
        updateUser.fulfilled(
          { ...MOCK_USER, ...MOCK_UPDATE },
          'fulfilled',
          MOCK_UPDATE
        )
      );

      expect(state.updateError).toBe(null);
      expect(state.data).toEqual(MOCK_UPDATE);
    });

    test('updateUser.rejected', () => {
      const errorMessage = 'Ошибка обновления данных пользователя';

      const state = userSlice.reducer(
        { ...userSlice.getInitialState(), data: MOCK_USER },
        updateUser.rejected(new Error(errorMessage), 'rejected', MOCK_UPDATE)
      );

      expect(state.updateError).toBe(errorMessage);
      expect(state.data).toEqual(MOCK_USER);
    });
  });
});
