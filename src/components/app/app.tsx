import { ProfileLayout } from '@/layouts/profile/profile.tsx';
import { RootLayout } from '@/layouts/root/root.tsx';
import { RouterPaths } from '@/router';
import { Routes, Route } from 'react-router';

import { FeedPage } from '@pages/feed/feed.tsx';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password.tsx';
import { IndexPage } from '@pages/index';
import { IngredientPage } from '@pages/ingredients/_id/_id.tsx';
import { LoginPage } from '@pages/login/login.tsx';
import { NotFoundPage } from '@pages/not-found/not-found.tsx';
import { OrdersPage } from '@pages/orders/orders.tsx';
import { ProfilePage } from '@pages/profile/profile.tsx';
import { RegisterPage } from '@pages/register/register.tsx';
import { ResetPasswordPage } from '@pages/reset-password/reset-password.tsx';

export const App = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path={RouterPaths.index} Component={RootLayout}>
        <Route index={true} Component={IndexPage} />
        <Route path={RouterPaths.login} Component={LoginPage} />
        <Route path={RouterPaths.register} Component={RegisterPage} />
        <Route path={RouterPaths.forgotPassword} Component={ForgotPasswordPage} />
        <Route path={RouterPaths.resetPassword} Component={ResetPasswordPage} />
        <Route path={RouterPaths.profile} Component={ProfileLayout}>
          <Route index={true} Component={ProfilePage} />
          <Route path={RouterPaths.orders} Component={OrdersPage} />
        </Route>
        <Route path={RouterPaths.ingredientPage} Component={IngredientPage} />
        <Route path={RouterPaths.feed} Component={FeedPage} />

        <Route path={RouterPaths.notFound} Component={NotFoundPage} />
      </Route>
    </Routes>
  );
};
