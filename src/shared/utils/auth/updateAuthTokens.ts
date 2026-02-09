import { API_BASE_URL } from '@shared/constants.ts';
import {
  clearAuthTokens,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@shared/utils';

import type {
  TUpdateTokenApiRequestParams,
  TUpdateTokenApiResponse,
} from '@shared/types/api.ts';

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
