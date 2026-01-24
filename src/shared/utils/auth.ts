import { ACCESS_TOKEN_KEY, API_BASE_URL, REFRESH_TOKEN_KEY } from '@shared/constants.ts';

import type {
  TUpdateTokenApiRequestParams,
  TUpdateTokenApiResponse,
} from '@shared/types/api.ts';

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

export const updateAuthTokens = async (): Promise<
  Pick<TUpdateTokenApiResponse, 'success'>
> => {
  const refreshToken = getRefreshToken();

  if (refreshToken == null) {
    clearAuthTokens();

    return { success: false };
  }

  try {
    const response = await fetch(`${API_BASE_URL}auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: refreshToken,
      } as TUpdateTokenApiRequestParams),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении токенов');
    }

    const data = (await response.json()) as TUpdateTokenApiResponse;

    if (!data.success) {
      throw new Error('Ошибка при обновлении токенов');
    }

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    return { success: true };
  } catch {
    console.error('Не удалось обновить RefreshToken');

    clearAuthTokens();

    return { success: false };
  }
};
