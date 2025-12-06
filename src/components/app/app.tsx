import { useInitAuth } from '@/hooks';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import { AppRouter } from '@components/router/app-router/app-router.tsx';
import { selectIsAuthLoading } from '@services/store/slices/auth.ts';

export const App = (): React.JSX.Element => {
  useInitAuth();

  const isAuthLoading = useSelector(selectIsAuthLoading);

  if (isAuthLoading) {
    return (
      <div className={`fullscreen-loader`}>
        <Preloader />
      </div>
    );
  }

  return <AppRouter />;
};
