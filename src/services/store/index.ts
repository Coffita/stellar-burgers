import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  ingredientsSlice,
  userSlice,
  burgerConstructorSlice,
  ordersSlice,
  feedsSlice
} from '@slices';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  user: userSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orders: ordersSlice.reducer,
  feeds: feedsSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
