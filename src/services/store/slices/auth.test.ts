import { describe, expect, test } from 'vitest';

import authSlice, {
  authInitFinish,
  authInitStart,
  resetAuth,
  selectIsAuthenticated,
  selectIsAuthLoading,
  selectUser,
  setUser,
} from '@services/store/slices/auth.ts';

import type { TAuthState } from '@services/store/slices/auth.ts';
import type { TUser } from '@shared/types/entities.ts';

describe('auth slice', () => {
  const mockUser = {
    email: 'mail@email.com',
    name: 'John Doe',
  } satisfies TUser;

  test('should return initial state', () => {
    expect(authSlice.getInitialState()).toEqual({
      user: null,
      isLoading: true,
    } as TAuthState);
  });

  describe('reducers', () => {
    describe('authInitStart', () => {
      test('should set isLoading to true', () => {
        const state = authSlice.reducer(undefined, authInitStart());

        expect(state.isLoading).toBe(true);
      });
    });

    describe('authInitFinish', () => {
      test('should set isLoading to false', () => {
        const state = authSlice.reducer(undefined, authInitFinish());

        expect(state.isLoading).toBe(false);
      });
    });

    describe('setUser', () => {
      test('should set user', () => {
        const state = authSlice.reducer(undefined, setUser(mockUser));

        expect(state.user).toEqual(mockUser);
      });
    });

    describe('resetAuth', () => {
      test('should set [user->null], [isLoading->false]', () => {
        const initialState = {
          user: mockUser,
          isLoading: false,
        } satisfies TAuthState;

        const expected = {
          user: null,
          isLoading: false,
        } satisfies TAuthState;

        expect(authSlice.reducer(initialState, resetAuth())).toMatchObject(expected);
      });
    });
  });

  describe('selectors', () => {
    describe('selectIsAuthLoading', () => {
      test('should return isLoading', () => {
        const initialState = {
          user: mockUser,
          isLoading: false,
        } satisfies TAuthState;

        const result = selectIsAuthLoading({ auth: initialState });

        expect(result).toBe(false);
      });
    });

    describe('selectIsAuthenticated', () => {
      test('should return authenticated state', () => {
        const initialState = {
          user: mockUser,
          isLoading: false,
        } satisfies TAuthState;

        const result = selectIsAuthenticated({ auth: initialState });

        expect(result).toBe(true);
      });
    });

    describe('selectUser', () => {
      const initialState = {
        user: mockUser,
        isLoading: false,
      } satisfies TAuthState;

      const result = selectUser({ auth: initialState });
      const sameResult = selectUser({ auth: initialState });

      test('should return user', () => {
        expect(result).toEqual(mockUser);
      });

      test('should return null if user not defined', () => {
        expect(selectUser({ auth: { ...initialState, user: null } })).toBe(null);
      });

      test('should return same reference', () => {
        expect(result).toBe(sameResult);
      });
    });
  });
});
