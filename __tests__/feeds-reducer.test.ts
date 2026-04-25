import { describe, expect, test } from '@jest/globals';
import { feedsSlice, fetchFeeds } from '../src/services/slices';
import { TFeedsResponse } from '../src/utils/burger-api';

const MOCK_FEEDS_RESPONSE: TFeedsResponse = {
  success: true,
  total: 5186,
  totalToday: 24,
  orders: [
    {
      _id: '69ebee50a64177001b333af6',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Минеральный альфа-сахаридный краторный бургер',
      createdAt: '2026-04-24T22:27:28.683Z',
      updatedAt: '2026-04-24T22:27:28.744Z',
      number: 104563
    },
    {
      _id: '69ebe883a64177001b333af0',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Люминесцентный краторный бургер',
      createdAt: '2026-04-24T22:02:43.591Z',
      updatedAt: '2026-04-24T22:02:43.716Z',
      number: 104562
    },
    {
      _id: '69ebe540a64177001b333ae6',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2026-04-24T21:48:48.786Z',
      updatedAt: '2026-04-24T21:48:48.844Z',
      number: 104561
    }
  ]
};

describe('feedsReducer', () => {
  describe('Получение ленты заказов', () => {
    test('fetchFeeds.pending', () => {
      const state = feedsSlice.reducer(
        feedsSlice.getInitialState(),
        fetchFeeds.pending('pending')
      );

      expect(state.isLoading).toBe(true);
    });

    test('fetchFeeds.fulfilled', () => {
      const state = feedsSlice.reducer(
        feedsSlice.getInitialState(),
        fetchFeeds.fulfilled(MOCK_FEEDS_RESPONSE, 'fulfilled', undefined)
      );

      expect(state.data).toEqual(MOCK_FEEDS_RESPONSE);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    test('fetchFeeds.rejected', () => {
      const errorMessage = 'Ошибка загрузки';

      const state = feedsSlice.reducer(
        feedsSlice.getInitialState(),
        fetchFeeds.rejected(new Error(errorMessage), 'rejected', undefined)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
