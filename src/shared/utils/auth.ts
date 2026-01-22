import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shared/constants.ts';

export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token.replace('Bearer ', ''));
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};
