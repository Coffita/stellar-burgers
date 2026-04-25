import { describe, expect, test } from '@jest/globals';
import { ingredientsSlice, fetchIngredients } from '../src/services/slices';
import { TIngredient } from '../src/utils/types';

const MOCK_INGREDIENTS: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('ingredientsReducer', () => {
  describe('Получение ингредиентов', () => {
    test('fetchIngredients.pending', () => {
      const state = ingredientsSlice.reducer(
        ingredientsSlice.getInitialState(),
        fetchIngredients.pending('pending')
      );

      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    test('fetchIngredients.fulfilled', () => {
      const state = ingredientsSlice.reducer(
        ingredientsSlice.getInitialState(),
        fetchIngredients.fulfilled(MOCK_INGREDIENTS, 'fulfilled', undefined)
      );

      expect(state.data).toEqual(MOCK_INGREDIENTS);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    test('fetchIngredients.rejected', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';

      const state = ingredientsSlice.reducer(
        ingredientsSlice.getInitialState(),
        fetchIngredients.rejected(
          new Error(errorMessage),
          'rejected',
          undefined
        )
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
