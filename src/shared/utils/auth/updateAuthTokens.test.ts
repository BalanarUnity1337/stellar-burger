import { API_BASE_URL } from '@shared/constants.ts';
import { updateAuthTokens } from '@shared/utils';
import { afterEach, describe, expect, test, vi } from 'vitest';

import * as manageTokens from './manageTokens.ts';

import type {
  TUpdateTokenApiRequestParams,
  TUpdateTokenApiResponse,
} from '@shared/types/api.ts';

vi.stubGlobal('fetch', vi.fn());

vi.mock('./manageTokens.ts', () => ({
  getRefreshToken: vi.fn(),
  setRefreshToken: vi.fn(),
  setAccessToken: vi.fn(),
  clearAuthTokens: vi.fn(),
}));

describe('auth', () => {
  const fetchSpied = vi.spyOn(global, 'fetch');

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('updateAuthTokens', () => {
    test('should return [success: false] if no refreshToken', async () => {
      vi.mocked(manageTokens.getRefreshToken).mockReturnValue(null);

      const result = await updateAuthTokens();

      expect(result).toEqual({ success: false });
      expect(manageTokens.clearAuthTokens).toHaveBeenCalled();
      expect(fetchSpied).not.toHaveBeenCalled();
    });

    test('should return [success: false] if fetch fails', async () => {
      vi.mocked(manageTokens.getRefreshToken).mockReturnValue('old-refresh-token');

      fetchSpied.mockResolvedValue({
        ok: false,
      } as Response);

      const result = await updateAuthTokens();

      expect(result).toEqual({ success: false });
      expect(fetchSpied).toHaveBeenCalled();
    });

    test('should return [success: false] if request returned [success: false]', async () => {
      vi.mocked(manageTokens.getRefreshToken).mockReturnValue('old-refresh-token');

      fetchSpied.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: false }),
      } as unknown as Response);

      const result = await updateAuthTokens();

      expect(result).toEqual({ success: false });
      expect(fetchSpied).toHaveBeenCalled();
    });

    test('should return [success: true] and set tokens if request returned [success: true]', async () => {
      vi.mocked(manageTokens.getRefreshToken).mockReturnValue('old-refresh-token');

      fetchSpied.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          success: true,
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token',
        } satisfies TUpdateTokenApiResponse),
      } as unknown as Response);

      const result = await updateAuthTokens();

      expect(result).toEqual({ success: true });
      expect(fetchSpied).toHaveBeenCalledWith(`${API_BASE_URL}auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'old-refresh-token',
        } as TUpdateTokenApiRequestParams),
      });
      expect(manageTokens.setAccessToken).toHaveBeenCalledWith('new-access-token');
      expect(manageTokens.setRefreshToken).toHaveBeenCalledWith('new-refresh-token');
    });

    test('should not throw unhandled exceptions', async () => {
      vi.mocked(manageTokens.getRefreshToken).mockReturnValue('old-refresh-token');

      fetchSpied.mockRejectedValue(new Error('Unhandled error'));

      await expect(updateAuthTokens()).resolves.toEqual({ success: false });
    });
  });
});
