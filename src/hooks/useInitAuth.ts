import { getRefreshToken } from '@shared/utils';
import { useEffect } from 'react';

import { useLazyGetUserInfoQuery } from '@services/store/api';
import { useAppDispatch } from '@services/store/hooks.ts';
import {
  authInitStart,
  authInitFinish,
  resetAuth,
} from '@services/store/slices/auth.ts';

export const useInitAuth = (): void => {
  const dispatch = useAppDispatch();

  const [getUserInfo] = useLazyGetUserInfoQuery();

  useEffect(() => {
    const refreshToken = getRefreshToken();

    if (refreshToken == null) {
      dispatch(resetAuth());

      return;
    }

    const init = async (): Promise<void> => {
      try {
        dispatch(authInitStart());

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
