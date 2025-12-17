import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { baseApi } from '@services/store/api';
import { authSlice, burgerConstructorSlice } from '@services/store/slices';

export const rootReducer = combineSlices(baseApi, burgerConstructorSlice, authSlice);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
