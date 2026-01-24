import { ProfileLayout } from '@/layouts/profile/profile.tsx';
import { RootLayout } from '@/layouts/root/root.tsx';
import { RouterPaths } from '@/router';
import { Route, Routes, useLocation } from 'react-router';

import { IngredientModal } from '@components/router-modals/ingredient-modal/ingredient-modal.tsx';
import { OrderDetailsModal } from '@components/router-modals/order-details-modal/order-details-modal.tsx';
import { ProtectedRoute } from '@components/router/protected-route/protected-route.tsx';
import { FeedOrderPage } from '@pages/feed/_id/_id.tsx';
import { FeedPage } from '@pages/feed/feed.tsx';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password.tsx';
import { HomePage } from '@pages/home/home.tsx';
import { IngredientPage } from '@pages/ingredients/_id/_id.tsx';
import { LoginPage } from '@pages/login/login.tsx';
import { NotFoundPage } from '@pages/not-found/not-found.tsx';
import { ProfileOrderPage } from '@pages/profile/orders/_id/_id.tsx';
import { ProfileOrdersPage } from '@pages/profile/orders/orders.tsx';
import { ProfilePage } from '@pages/profile/profile.tsx';
import { RegisterPage } from '@pages/register/register.tsx';
import { ResetPasswordPage } from '@pages/reset-password/reset-password.tsx';

import type { TBackgroundLocationState } from '@shared/types/global.ts';
import type { Location } from 'react-router';

export const AppRouter = (): React.JSX.Element => {
  const location = useLocation() as Location<TBackgroundLocationState>;
  const background = location.state?.background;

  return (
    <>
      <Routes location={background ?? location}>
        <Route path={RouterPaths.home} Component={RootLayout}>
          <Route index={true} Component={HomePage} />
          <Route
            path={RouterPaths.login}
            element={<ProtectedRoute onlyAuth={false} element={<LoginPage />} />}
          />
          <Route
            path={RouterPaths.register}
            element={<ProtectedRoute onlyAuth={false} element={<RegisterPage />} />}
          />
          <Route
            path={RouterPaths.forgotPassword}
            element={
              <ProtectedRoute onlyAuth={false} element={<ForgotPasswordPage />} />
            }
          />
          <Route
            path={RouterPaths.resetPassword}
            element={<ProtectedRoute onlyAuth={false} element={<ResetPasswordPage />} />}
          />
          <Route
            path={RouterPaths.profile}
            element={<ProtectedRoute element={<ProfileLayout />} />}
          >
            <Route index={true} Component={ProfilePage} />
            <Route path={RouterPaths.profileOrders} Component={ProfileOrdersPage} />
          </Route>
          <Route path={RouterPaths.ingredientPage} Component={IngredientPage} />
          <Route path={RouterPaths.feed} Component={FeedPage} />
          <Route path={RouterPaths.feedOrderPage} Component={FeedOrderPage} />
          <Route
            path={RouterPaths.profileOrderPage}
            element={<ProtectedRoute element={<ProfileOrderPage />} />}
          />

          <Route path={RouterPaths.notFound} Component={NotFoundPage} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path={RouterPaths.ingredientPage} Component={IngredientModal} />
          <Route path={RouterPaths.feedOrderPage} Component={OrderDetailsModal} />
          <Route path={RouterPaths.profileOrderPage} Component={OrderDetailsModal} />
        </Routes>
      )}
    </>
  );
};
