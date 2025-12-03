import { RouterPaths } from '@/router';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { selectIsAuthenticated } from '@services/store/slices/auth.ts';

type TRedirectIfAuthProps = {
  element: React.ReactElement;
};

export const RedirectIfAuth = ({
  element,
}: TRedirectIfAuthProps): React.ReactElement => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to={RouterPaths.home} replace={true} /> : element;
};
