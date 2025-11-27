import { baseApi } from '@services/store/api';

import type {
  TLoginApiRequestParams,
  TLoginApiResponse,
  TLogoutApiRequestParams,
  TLogoutApiResponse,
  TRegisterApiRequestParams,
  TRegisterApiResponse,
  TTokenApiRequestParams,
  TTokenApiResponse,
} from '@shared/types/api.ts';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TLoginApiResponse, TLoginApiRequestParams>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),

    register: build.mutation<TRegisterApiResponse, TRegisterApiRequestParams>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),

    token: build.mutation<TTokenApiResponse, TTokenApiRequestParams>({
      query: (body) => ({
        url: 'token',
        method: 'POST',
        body,
      }),
    }),

    logout: build.mutation<TLogoutApiResponse, TLogoutApiRequestParams>({
      query: (body) => ({
        url: 'logout',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
