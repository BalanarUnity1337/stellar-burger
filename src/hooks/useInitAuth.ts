import { REFRESH_TOKEN_KEY } from '@shared/constants.ts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useLazyGetUserInfoQuery, useUpdateTokenMutation } from '@services/store/api';
import {
  authRequest,
  authRequestFulfilled,
  resetAuth,
  setAccessToken,
  setUser,
} from '@services/store/slices/auth.ts';

import type { TUpdateTokenApiRequestParams } from '@shared/types/api.ts';

export const useInitAuth = (): void => {
  const dispatch = useDispatch();

  const [getUserInfo] = useLazyGetUserInfoQuery();
  const [updateToken] = useUpdateTokenMutation();

  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  useEffect(() => {
    if (refreshToken == null) {
      dispatch(resetAuth());

      return;
    }

    const init = async (): Promise<void> => {
      try {
        dispatch(authRequest());

        const tokens = await updateToken({
          token: refreshToken,
        } satisfies TUpdateTokenApiRequestParams).unwrap();

        dispatch(setAccessToken(tokens.accessToken));
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);

        const userInfo = await getUserInfo().unwrap();

        dispatch(setUser(userInfo));
      } catch (_e) {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      } finally {
        dispatch(authRequestFulfilled());
      }
    };

    void init();
  }, []);
};
