import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@shared/constants.ts';
import { getAccessToken, updateAuthTokens } from '@shared/utils';
import { Mutex } from 'async-mutex';

import { resetAuth } from '@services/store/slices/auth.ts';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken();

    if (accessToken != null) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && [401, 403].includes(result.error.status as number)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const tokens = await updateAuthTokens();

        if (tokens.success) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(resetAuth());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
