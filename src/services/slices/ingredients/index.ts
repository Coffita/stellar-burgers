import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './async';
import { TIngredientsState } from './type';

const initialState: TIngredientsState = {
  data: [],
  isLoading: true,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || 'Ошибка загрузки ингредиентов';
      });
  }
});
