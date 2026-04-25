import { describe, expect, test } from '@jest/globals';
import {
  ordersSlice,
  fetchOrders,
  fetchOrder,
  createOrder
} from '../src/services/slices';
import { TOrder } from '../src/utils/types';

const MOCK_ORDERS: TOrder[] = [
  {
    _id: '69e53c74a64177001b33317c',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Метеоритный био-марсианский люминесцентный краторный бургер',
    createdAt: '2026-04-19T20:35:00.026Z',
    updatedAt: '2026-04-19T20:35:00.264Z',
    number: 104304
  },
  {
    _id: '69e55b64a64177001b333194',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Био-марсианский краторный бургер',
    createdAt: '2026-04-19T22:47:00.166Z',
    updatedAt: '2026-04-19T22:47:00.443Z',
    number: 104306
  }
];

const MOCK_ORDER: TOrder = MOCK_ORDERS[0];

const MOCK_ORDER_REQUEST_INGREDIENT_IDS: string[] = MOCK_ORDER.ingredients;

describe('ordersReducer', () => {
  describe('Получение заказов пользователя', () => {
    test('fetchOrders.pending', () => {
      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        fetchOrders.pending('pending')
      );

      expect(state.isOrdersLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    test('fetchOrders.fulfilled', () => {
      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        fetchOrders.fulfilled(MOCK_ORDERS, 'fulfilled', undefined)
      );

      expect(state.data).toEqual(MOCK_ORDERS);
      expect(state.isOrdersLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    test('fetchOrders.rejected', () => {
      const errorMessage = 'Ошибка загрузки заказов пользователя';

      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        fetchOrders.rejected(new Error(errorMessage), 'rejected', undefined)
      );

      expect(state.isOrdersLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Получение заказа', () => {
    test('fetchOrder.pending', () => {
      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        fetchOrder.pending('pending', MOCK_ORDER.number)
      );

      expect(state.isOrderLoading).toBe(true);
    });

    test('fetchOrder.fulfilled', () => {
      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        fetchOrder.fulfilled(MOCK_ORDER, 'fulfilled', MOCK_ORDER.number)
      );

      expect(state.isOrderLoading).toBe(false);
      expect(state.orderModalData).toEqual(MOCK_ORDER);
    });

    test('fetchOrder.rejected', () => {
      const errorMessage = 'Ошибка загрузки заказа';

      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        fetchOrder.rejected(
          new Error(errorMessage),
          'rejected',
          MOCK_ORDER.number
        )
      );

      expect(state.isOrderLoading).toBe(false);
    });
  });

  describe('Создание заказа', () => {
    test('createOrder.pending', () => {
      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        createOrder.pending('pending', MOCK_ORDER_REQUEST_INGREDIENT_IDS)
      );

      expect(state.orderRequest).toBe(true);
    });

    test('createOrder.fulfilled', () => {
      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        createOrder.fulfilled(
          MOCK_ORDER,
          'fulfilled',
          MOCK_ORDER_REQUEST_INGREDIENT_IDS
        )
      );

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(MOCK_ORDER);
    });

    test('createOrder.rejected', () => {
      const errorMessage = 'Ошибка создания заказа';

      const state = ordersSlice.reducer(
        ordersSlice.getInitialState(),
        createOrder.rejected(
          new Error(errorMessage),
          'rejected',
          MOCK_ORDER_REQUEST_INGREDIENT_IDS
        )
      );

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
