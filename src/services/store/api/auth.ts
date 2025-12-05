import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shared/constants.ts';

import { baseApi } from '@services/store/api';
import { resetAuth, setUser } from '@services/store/slices/auth.ts';

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

      onQueryStarted: async (_params, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;

          if (data.success) {
            dispatch(setUser(data.user));

            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),

    register: build.mutation<TRegisterApiResponse, TRegisterApiRequestParams>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),

      onQueryStarted: async (_params, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;

          if (data.success) {
            dispatch(setUser(data.user));

            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),

    logout: build.mutation<TLogoutApiResponse, TLogoutApiRequestParams>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),

      onQueryStarted: async (_params, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;

          if (data.success) {
            dispatch(resetAuth());
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
          }
        } catch (e) {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);

          console.error(e);
        }
      },
    }),

    getUserInfo: build.query<TUser, void>({
      query: () => ({
        url: 'auth/user',
      }),

      providesTags: ['User'],

      transformResponse: (response: TGetUserInfoApiResponse) => response.user,

      onQueryStarted: async (_params, { queryFulfilled, dispatch }) => {
        try {
          const { data: user } = await queryFulfilled;

          dispatch(setUser(user));
        } catch (e) {
          console.error(e);
        }
      },
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

      invalidatesTags: ['User'],
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
  useResetPasswordMutation,
  useSetNewPasswordMutation,
  useLazyGetUserInfoQuery,
  useUpdateUserInfoMutation,
} = authApi;
