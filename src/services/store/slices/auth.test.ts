import { describe, expect, test } from 'vitest';

import authSlice, {
  authInitFinish,
  authInitStart,
  resetAuth,
  selectIsAuthenticated,
  selectIsAuthLoading,
  selectUser,
  setUser,
  initialState,
} from '@services/store/slices/auth.ts';

import type { TUser } from '@shared/types/entities.ts';

const mockUser = {
  email: 'mail@email.com',
  name: 'John Doe',
} satisfies TUser;

describe('auth slice', () => {
  describe('reducers', () => {
    describe('unknown action', () => {
      test('should return initial state', () => {
        const state = authSlice.reducer(undefined, { type: 'unknown' });

        expect(state).toEqual(initialState);
      });
    });

    describe('authInitStart', () => {
      test('should set isLoading to true', () => {
        const state = authSlice.reducer(initialState, authInitStart());

        expect(state).toEqual({ ...initialState, isLoading: true });
      });
    });

    describe('authInitFinish', () => {
      test('should set isLoading to false', () => {
        const state = authSlice.reducer(initialState, authInitFinish());

        expect(state).toEqual({ ...initialState, isLoading: false });
      });
    });

    describe('setUser', () => {
      test('should set user', () => {
        const state = authSlice.reducer(initialState, setUser(mockUser));

        expect(state).toEqual({ ...initialState, user: mockUser });
      });
    });

    describe('resetAuth', () => {
      test('should set [user->null], [isLoading->false]', () => {
        expect(
          authSlice.reducer({ ...initialState, user: mockUser }, resetAuth())
        ).toEqual({ ...initialState, user: null, isLoading: false });
      });
    });
  });

  describe('selectors', () => {
    describe('selectIsAuthLoading', () => {
      test('should return isLoading -> false', () => {
        const result = selectIsAuthLoading({
          auth: { ...initialState, isLoading: false },
        });

        expect(result).toBe(false);
      });
    });

    describe('selectIsAuthenticated', () => {
      test('should return authenticated state', () => {
        const result = selectIsAuthenticated({
          auth: { ...initialState, user: mockUser },
        });

        expect(result).toBe(true);
      });
    });

    describe('selectUser', () => {
      test('should return user', () => {
        const result = selectUser({ auth: { ...initialState, user: mockUser } });

        expect(result).toEqual(mockUser);
      });

      test('should return null if user not defined', () => {
        expect(selectUser({ auth: { ...initialState, user: null } })).toBe(null);
      });

      test('should return same reference', () => {
        const result = selectUser({ auth: { ...initialState, user: mockUser } });
        const sameResult = selectUser({ auth: { ...initialState, user: mockUser } });

        expect(result).toBe(sameResult);
      });
    });
  });
});
