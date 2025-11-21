import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { baseApi } from '@services/store/api';
import { burgerConstructorSlice, selectedIngredientSlice } from '@services/store/slices';

export const rootReducer = combineSlices(
  baseApi,
  selectedIngredientSlice,
  burgerConstructorSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
