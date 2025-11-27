import type { TUser } from '@shared/types/entities.ts';
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

export type TTokenApiRequestParams = {
  token: TRefreshToken;
};

export type TTokenApiResponse = {
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
