import { RouterPaths } from '@/router';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import {
  selectIsAuthLoading,
  selectIsAuthenticated,
} from '@services/store/slices/auth.ts';

type TProtectedRouteElementProps = {
  element: React.ReactElement;
};

export const ProtectedRouteElement = ({
  element,
}: TProtectedRouteElementProps): React.ReactElement | null => {
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthLoading) {
    return null;
  }

  return isAuthenticated ? element : <Navigate to={RouterPaths.login} replace={true} />;
};
