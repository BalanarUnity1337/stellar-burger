import { RouterPaths } from '@/router';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { selectIsAuthenticated } from '@services/store/slices/auth.ts';

type TProtectedRouteProps = {
  element: React.ReactElement;
  onlyAuth?: boolean;
};

export const ProtectedRoute = ({
  element,
  onlyAuth = true,
}: TProtectedRouteProps): React.ReactElement | null => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (onlyAuth && !isAuthenticated) {
    return (
      <Navigate
        to={RouterPaths.login}
        replace={true}
        state={{
          redirect: location.pathname,
        }}
      />
    );
  }

  if (!onlyAuth && isAuthenticated) {
    return <Navigate to={RouterPaths.home} replace={true} />;
  }

  return element;
};
