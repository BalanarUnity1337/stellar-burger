import { baseApi } from '@services/store/api';

import type {
  TGetUserInfoApiResponse,
  TLoginApiRequestParams,
  TLoginApiResponse,
  TLogoutApiRequestParams,
  TLogoutApiResponse,
  TRegisterApiRequestParams,
  TRegisterApiResponse,
  TResetPasswordApiRequestParams,
  TResetPasswordApiResponse,
  TSetNewPasswordApiRequestParams,
  TSetNewPasswordApiResponse,
  TUpdateTokenApiRequestParams,
  TUpdateTokenApiResponse,
  TUpdateUserInfoApiRequestParams,
  TUpdateUserInfoApiResponse,
} from '@shared/types/api.ts';
import type { TUser } from '@shared/types/entities.ts';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TLoginApiResponse, TLoginApiRequestParams>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),

    register: build.mutation<TRegisterApiResponse, TRegisterApiRequestParams>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),

    updateToken: build.mutation<TUpdateTokenApiResponse, TUpdateTokenApiRequestParams>({
      query: (body) => ({
        url: 'auth/token',
        method: 'POST',
        body,
      }),
    }),

    logout: build.mutation<TLogoutApiResponse, TLogoutApiRequestParams>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),
    }),

    getUserInfo: build.query<TUser, void>({
      query: () => ({
        url: 'auth/user',
      }),

      onQueryStarted: async (_params, { queryFulfilled }) => {
        try {
          const data = await queryFulfilled;

          console.log(data);
        } catch (e) {
          console.log(e);
        }
      },

      transformResponse: (response: TGetUserInfoApiResponse) => response.user,
    }),

    updateUserInfo: build.mutation<
      TUpdateUserInfoApiResponse,
      TUpdateUserInfoApiRequestParams
    >({
      query: (body) => ({
        url: 'auth/user',
        method: 'PATCH',
        body,
      }),
    }),

    resetPassword: build.mutation<
      TResetPasswordApiResponse,
      TResetPasswordApiRequestParams
    >({
      query: (body) => ({
        url: 'password-reset',
        method: 'POST',
        body,
      }),
    }),

    setNewPassword: build.mutation<
      TSetNewPasswordApiResponse,
      TSetNewPasswordApiRequestParams
    >({
      query: (body) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateTokenMutation,
  useResetPasswordMutation,
  useSetNewPasswordMutation,
  useLazyGetUserInfoQuery,
} = authApi;
