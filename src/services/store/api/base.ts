import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, REFRESH_TOKEN_KEY } from '@shared/constants.ts';

import { resetAuth, setAccessToken } from '@services/store/slices/auth.ts';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { RootState } from '@services/store';
import type { TUpdateTokenApiResponse } from '@shared/types/api.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    if (accessToken != null) {
      headers.set('Authorization', accessToken);
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

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (refreshToken === null) {
      api.dispatch(resetAuth());

      return result;
    }

    const tokenResult = await baseQuery(
      { url: 'auth/token', method: 'POST', body: { token: refreshToken } },
      api,
      extraOptions
    );

    const data = tokenResult.data as TUpdateTokenApiResponse | undefined;

    if (data?.success) {
      api.dispatch(setAccessToken(data.accessToken));
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetAuth());
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
