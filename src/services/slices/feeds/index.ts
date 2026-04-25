import { createSlice } from '@reduxjs/toolkit';
import { fetchFeeds } from './async';
import { TFeedsState } from './type';

const initialState: TFeedsState = {
  data: { orders: [], total: 0, totalToday: 0 },
  isLoading: true,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || 'Ошибка загрузки';
      });
  }
});
