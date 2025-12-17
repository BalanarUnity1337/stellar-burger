import { useInitAuth } from '@/hooks';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { AppRouter } from '@components/router/app-router/app-router.tsx';
import { useAppSelector } from '@services/store/hooks.ts';
import { selectIsAuthLoading } from '@services/store/slices/auth.ts';

export const App = (): React.JSX.Element => {
  useInitAuth();

  const isAuthLoading = useAppSelector(selectIsAuthLoading);

  if (isAuthLoading) {
    return (
      <div className={`fullscreen-loader`}>
        <Preloader />
      </div>
    );
  }

  return <AppRouter />;
};
