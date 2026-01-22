import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ACCESS_TOKEN_KEY, API_BASE_URL, REFRESH_TOKEN_KEY } from '@shared/constants.ts';
import { setAccessToken, setRefreshToken } from '@shared/utils';

import { resetAuth } from '@services/store/slices/auth.ts';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type {
  TUpdateTokenApiRequestParams,
  TUpdateTokenApiResponse,
} from '@shared/types/api.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken != null) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && [401, 403].includes(result.error.status as number)) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (refreshToken === null) {
      api.dispatch(resetAuth());

      return result;
    }

    const tokenResult = await baseQuery(
      {
        url: 'auth/token',
        method: 'POST',
        body: { token: refreshToken } as TUpdateTokenApiRequestParams,
      },
      api,
      extraOptions
    );

    const data = tokenResult.data as TUpdateTokenApiResponse | undefined;

    if (data?.success) {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetAuth());

      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Ingredients', 'User'],
  endpoints: () => ({}),
});
