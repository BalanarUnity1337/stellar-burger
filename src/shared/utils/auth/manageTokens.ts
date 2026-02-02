import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shared/constants.ts';

export const setAccessToken = (token: string | null): void => {
  if (token === null) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } else {
    localStorage.setItem(ACCESS_TOKEN_KEY, token.replace('Bearer ', ''));
  }
};

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);

export const setRefreshToken = (token: string | null): void => {
  if (token === null) {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } else {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const clearAuthTokens = (): void => {
  setAccessToken(null);
  setRefreshToken(null);
};
