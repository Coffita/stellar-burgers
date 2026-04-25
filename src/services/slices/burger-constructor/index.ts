import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorState } from './type';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '@slices';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<TIngredient['_id']>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;

      const ingredient = state.ingredients[index];

      if (direction === 'up' && index > 0) {
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = ingredient;
      } else if (direction === 'down' && index < state.ingredients.length - 1) {
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = ingredient;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const { setBun, addIngredient, removeIngredient, moveIngredient } =
  burgerConstructorSlice.actions;
