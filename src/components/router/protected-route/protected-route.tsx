import { RouterPaths } from '@/router';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { selectIsAuthenticated } from '@services/store/slices/auth.ts';

type TProtectedRouteProps = {
  element: React.ReactElement;
};

export const ProtectedRoute = ({
  element,
}: TProtectedRouteProps): React.ReactElement | null => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate
      to={RouterPaths.login}
      replace={true}
      state={{
        redirect: location.pathname,
      }}
    />
  );
};
