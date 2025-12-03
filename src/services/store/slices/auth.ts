import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '@shared/types/entities.ts';
import type { TAccessToken } from '@shared/types/global.ts';

type TAuthState = {
  accessToken: TAccessToken | null;
  user: TUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const initialState: TAuthState = {
  user: null,
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,
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
      state.isAuthenticated = true;
    },

    setAccessToken: (state, action: PayloadAction<TAccessToken>) => {
      state.accessToken = action.payload;
    },

    resetAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
  selectors: {
    selectIsAuthLoading: (state) => state.isLoading,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
  },
});

export const { setUser, setAccessToken, resetAuth, authInitStart, authInitFinish } =
  authSlice.actions;

export const { selectIsAuthLoading, selectIsAuthenticated, selectUser } =
  authSlice.selectors;

export default authSlice;
