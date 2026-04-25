import { describe, expect, test } from '@jest/globals';
import store, { rootReducer } from '../src/services/store';

describe('rootReducer', () => {
  test('Вызов rootReducer с необрабатываемым экшеном возвращает начальное состояние', () => {
    const initialState = store.getState();
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });
});
