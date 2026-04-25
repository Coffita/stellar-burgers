import { describe, expect, test } from '@jest/globals';
import { burgerConstructorSlice } from '../src/services/slices';
import {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../src/services/slices';
import { TIngredient } from '../src/utils/types';

const MOCK_BUN: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const MOCK_INGREDIENT_1: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0944',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
};

const MOCK_INGREDIENT_2: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

describe('burgerConstructorReducer', () => {
  describe('Для иггридиента задается id', () => {
    test('Должен задать id для добавляемого ингредиента', () => {
      const state = burgerConstructorSlice.reducer(
        burgerConstructorSlice.getInitialState(),
        addIngredient(MOCK_INGREDIENT_1)
      );

      expect(state.ingredients[0].id).toBeDefined();
    });
  });

  describe('Установка булки', () => {
    test('Должен установить булку', () => {
      const state = burgerConstructorSlice.reducer(
        burgerConstructorSlice.getInitialState(),
        burgerConstructorSlice.actions.setBun(MOCK_BUN)
      );

      expect(state.bun).toEqual(MOCK_BUN);
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('Добавление ингредиента', () => {
    test('Должен добавить ингредиент', () => {
      const state = burgerConstructorSlice.reducer(
        burgerConstructorSlice.getInitialState(),
        addIngredient(MOCK_INGREDIENT_1)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject(MOCK_INGREDIENT_1);
      expect(state.ingredients[0].id).toBeDefined();
      expect(state.bun).toBe(null);
    });
  });

  describe('Удаление ингредиента', () => {
    test('Должен удалить ингредиент', () => {
      const state = burgerConstructorSlice.reducer(
        {
          ...burgerConstructorSlice.getInitialState(),
          ingredients: [
            { ...MOCK_INGREDIENT_1, id: '1' },
            { ...MOCK_INGREDIENT_2, id: '2' }
          ]
        },
        removeIngredient('1')
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject(MOCK_INGREDIENT_2);
      expect(state.bun).toBe(null);
    });
  });

  describe('Перемещение ингредиента', () => {
    test('Должен переместить ингредиент вверх', () => {
      const state = burgerConstructorSlice.reducer(
        {
          ...burgerConstructorSlice.getInitialState(),
          ingredients: [
            { ...MOCK_INGREDIENT_1, id: '1' },
            { ...MOCK_INGREDIENT_2, id: '2' }
          ]
        },
        moveIngredient({ index: 1, direction: 'up' })
      );

      expect(state.ingredients[0]._id).toBe(MOCK_INGREDIENT_2._id);
      expect(state.ingredients[1]._id).toBe(MOCK_INGREDIENT_1._id);
    });

    test('Должен переместить ингредиент вниз', () => {
      const state = burgerConstructorSlice.reducer(
        {
          ...burgerConstructorSlice.getInitialState(),
          ingredients: [
            { ...MOCK_INGREDIENT_1, id: '1' },
            { ...MOCK_INGREDIENT_2, id: '2' }
          ]
        },
        moveIngredient({ index: 0, direction: 'down' })
      );

      expect(state.ingredients[0]._id).toBe(MOCK_INGREDIENT_2._id);
      expect(state.ingredients[1]._id).toBe(MOCK_INGREDIENT_1._id);
    });

    test('Не должен перемещать ингредиент вверх, если он уже на самой верхней позиции', () => {
      const state = burgerConstructorSlice.reducer(
        {
          ...burgerConstructorSlice.getInitialState(),
          ingredients: [
            { ...MOCK_INGREDIENT_1, id: '1' },
            { ...MOCK_INGREDIENT_2, id: '2' }
          ]
        },
        moveIngredient({ index: 0, direction: 'up' })
      );

      expect(state.ingredients[0]._id).toBe(MOCK_INGREDIENT_1._id);
      expect(state.ingredients[1]._id).toBe(MOCK_INGREDIENT_2._id);
    });

    test('Не должен перемещать ингредиент вниз, если он уже на самой нижней позиции', () => {
      const state = burgerConstructorSlice.reducer(
        {
          ...burgerConstructorSlice.getInitialState(),
          ingredients: [
            { ...MOCK_INGREDIENT_1, id: '1' },
            { ...MOCK_INGREDIENT_2, id: '2' }
          ]
        },
        moveIngredient({ index: 1, direction: 'down' })
      );

      expect(state.ingredients[0]._id).toBe(MOCK_INGREDIENT_1._id);
      expect(state.ingredients[1]._id).toBe(MOCK_INGREDIENT_2._id);
    });
  });
});
