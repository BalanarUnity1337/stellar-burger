import { REFRESH_TOKEN_KEY } from '@shared/constants.ts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useLazyGetUserInfoQuery, useUpdateTokenMutation } from '@services/store/api';
import {
  authInitStart,
  authInitFinish,
  resetAuth,
} from '@services/store/slices/auth.ts';

export const useInitAuth = (): void => {
  const dispatch = useDispatch();

  const [getUserInfo] = useLazyGetUserInfoQuery();
  const [updateToken] = useUpdateTokenMutation();

  useEffect(() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (refreshToken == null) {
      dispatch(resetAuth());

      return;
    }

    const init = async (): Promise<void> => {
      try {
        dispatch(authInitStart());

        await updateToken({ token: refreshToken }).unwrap();

        await getUserInfo().unwrap();
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(authInitFinish());
      }
    };

    void init();
  }, []);
};
