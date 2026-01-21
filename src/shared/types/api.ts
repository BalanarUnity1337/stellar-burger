import type { TOrderItem, TUser } from '@shared/types/entities.ts';
import type { TAccessToken, TRefreshToken } from '@shared/types/global.ts';

export type TApiCommonResponse<T> = {
  data: T;
  success: boolean;
};

export type TLoginApiRequestParams = {
  email: string;
  password: string;
};

export type TLoginApiResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TRegisterApiRequestParams = {
  email: string;
  password: string;
  name: string;
};

export type TRegisterApiResponse = {
  success: boolean;
  user: TUser;
  accessToken: TAccessToken;
  refreshToken: TRefreshToken;
};

export type TUpdateTokenApiRequestParams = {
  token: TRefreshToken;
};

export type TUpdateTokenApiResponse = {
  success: boolean;
  accessToken: TAccessToken;
  refreshToken: TRefreshToken;
};

export type TLogoutApiRequestParams = {
  token: TRefreshToken;
};

export type TLogoutApiResponse = {
  success: boolean;
  message: string;
};

export type TGetUserInfoApiResponse = {
  success: boolean;
  user: TUser;
};

export type TUpdateUserInfoApiRequestParams = {
  name: string;
  email: string;
  password: string;
};

export type TUpdateUserInfoApiResponse = {
  success: boolean;
  user: TUser;
};

export type TResetPasswordApiRequestParams = {
  email: string;
};

export type TResetPasswordApiResponse = {
  success: boolean;
  message: string;
};

export type TSetNewPasswordApiRequestParams = {
  password: string;
  token: string;
};

export type TSetNewPasswordApiResponse = {
  success: boolean;
  message: string;
};

export type TCreateOrderApiRequestParams = {
  ingredients: string[];
};

export type TCreateOrderApiResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type TGetOrdersApiResponse = {
  orders: TOrderItem[];
  success: boolean;
  total: number;
  totalToday: number;
};

export type TGetOrdersWithWSLoading = TGetOrdersApiResponse & {
  isWSLoading: boolean;
};

export type TGetOrderByNumberApiResponse = {
  orders: [TOrderItem];
  success: boolean;
};
