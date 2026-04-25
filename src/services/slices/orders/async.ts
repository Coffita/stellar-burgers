import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await getOrdersApi();

  return response;
});

export const fetchOrder = createAsyncThunk<TOrder, number>(
  'orders/fetchOrder',
  async (orderId) => {
    const response = await getOrderByNumberApi(orderId);

    return response.orders[0];
  }
);

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'orders/createOrder',
  async (ingredientIds) => {
    const response = await orderBurgerApi(ingredientIds);

    const order: TOrder = {
      ...response.order,
      ingredients: response.order.ingredients.map(
        (ingredient) => ingredient._id
      )
    };

    return order;
  }
);
