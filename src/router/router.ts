import { Routes } from '@/router/routes.ts';
import { createBrowserRouter } from 'react-router';

import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password.tsx';
import { LoginPage } from '@pages/login/login.tsx';
import { NotFoundPage } from '@pages/not-found/not-found.tsx';
import { RegisterPage } from '@pages/register/register.tsx';
import { ResetPasswordPage } from '@pages/reset-password/reset-password.tsx';

export const router = createBrowserRouter([
  {
    path: Routes.login,
    Component: LoginPage,
  },
  {
    path: Routes.register,
    Component: RegisterPage,
  },
  {
    path: Routes.forgotPassword,
    Component: ForgotPasswordPage,
  },
  {
    path: Routes.resetPassword,
    Component: ResetPasswordPage,
  },
  {
    path: Routes.notFound,
    Component: NotFoundPage,
  },
]);
