import { baseApi } from '@/api';
import { selectedIngredientSlice } from '@/store/slices';
import { configureStore, combineSlices } from '@reduxjs/toolkit';

export const rootReducer = combineSlices(baseApi, selectedIngredientSlice);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
