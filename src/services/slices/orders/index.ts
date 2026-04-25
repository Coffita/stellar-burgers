import { createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchOrder, fetchOrders } from './async';
import { TOrdersState } from './type';

const initialState: TOrdersState = {
  isOrderLoading: true,
  isOrdersLoading: true,
  orderRequest: false,
  orderModalData: null,
  error: null,
  data: []
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isOrdersLoading = false;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error?.message || 'Ошибка загрузки заказов';
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error?.message || 'Ошибка создания заказа';
      });
  }
});

export const { clearOrderModalData } = ordersSlice.actions;
