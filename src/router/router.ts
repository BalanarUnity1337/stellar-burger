import { DefaultLayout } from '@/layouts/default/default.tsx';
import { RouterPaths } from '@/router/path.ts';
import { createBrowserRouter } from 'react-router';

import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password.tsx';
import { IndexPage } from '@pages/index';
import { IngredientPage } from '@pages/ingredients/_id/_id.tsx';
import { LoginPage } from '@pages/login/login.tsx';
import { NotFoundPage } from '@pages/not-found/not-found.tsx';
import { ProfilePage } from '@pages/profile/profile.tsx';
import { RegisterPage } from '@pages/register/register.tsx';
import { ResetPasswordPage } from '@pages/reset-password/reset-password.tsx';

export const router = createBrowserRouter([
  {
    path: RouterPaths.index,
    Component: DefaultLayout,
    children: [
      { index: true, Component: IndexPage },
      { path: RouterPaths.ingredientPage, Component: IngredientPage },
      { path: RouterPaths.profile, Component: ProfilePage },
      { path: RouterPaths.login, Component: LoginPage },
      { path: RouterPaths.register, Component: RegisterPage },
      { path: RouterPaths.forgotPassword, Component: ForgotPasswordPage },
      { path: RouterPaths.resetPassword, Component: ResetPasswordPage },
    ],
  },
  {
    path: RouterPaths.notFound,
    Component: NotFoundPage,
  },
]);
