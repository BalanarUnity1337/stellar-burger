import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '@shared/types/entities.ts';

type TAuthState = {
  user: TUser | null;
  isLoading: boolean;
};

const initialState: TAuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authInitStart: (state) => {
      state.isLoading = true;
    },

    authInitFinish: (state) => {
      state.isLoading = false;
    },

    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },

    resetAuth: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
  selectors: {
    selectIsAuthLoading: (state) => state.isLoading,
    selectIsAuthenticated: (state) => state.user !== null,
    selectUser: (state) => state.user,
  },
});

export const { setUser, resetAuth, authInitStart, authInitFinish } = authSlice.actions;

export const { selectIsAuthLoading, selectIsAuthenticated, selectUser } =
  authSlice.selectors;

export default authSlice;
