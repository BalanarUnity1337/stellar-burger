import { RouterPaths } from '@/router';
import { RESET_PASSWORD_KEY } from '@shared/constants.ts';
import { Navigate } from 'react-router';

import { ResetPasswordForm } from '@components/auth/reset-password-form/reset-password-form.tsx';

export const ResetPasswordPage = (): React.JSX.Element => {
  const isResettingPassword = localStorage.getItem(RESET_PASSWORD_KEY) === 'true';

  if (!isResettingPassword) {
    return <Navigate to={RouterPaths.forgotPassword} replace={true} />;
  }

  return <ResetPasswordForm />;
};
