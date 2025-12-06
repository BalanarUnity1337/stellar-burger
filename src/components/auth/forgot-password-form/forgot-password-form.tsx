import { useForm } from '@/hooks';
import { RouterPaths } from '@/router';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { RESET_PASSWORD_KEY } from '@shared/constants.ts';
import { normalizeApiError } from '@shared/utils';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useResetPasswordMutation } from '@services/store/api';

export const ForgotPasswordForm = (): React.JSX.Element => {
  const navigate = useNavigate();

  const { formState, onFormInputChange } = useForm({
    email: '',
  });

  const [formError, setFormError] = useState('');

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleFormSubmit = async (): Promise<void> => {
    try {
      setFormError('');

      const data = await resetPassword(formState).unwrap();

      if (data.success) {
        localStorage.setItem(RESET_PASSWORD_KEY, String(true));

        await navigate(RouterPaths.resetPassword);
      }
    } catch (e) {
      const apiError = normalizeApiError(e);

      setFormError(apiError.message!);
    }
  };

  const isSubmitButtonDisabled = isLoading || formState.email.length === 0;

  const slotButtonsContent = (
    <Button
      htmlType="submit"
      type="primary"
      size="medium"
      disabled={isSubmitButtonDisabled}
      extraClass={`ml-auto mr-auto`}
    >
      Восстановить
    </Button>
  );

  const slotErrorsContent = formError && (
    <Text color="error" size="small">
      {formError}
    </Text>
  );

  const slotFooterContent = (
    <Text color="inactive">
      Вспомнили пароль?
      <Link className={`link ml-2`} to={RouterPaths.login}>
        Войти
      </Link>
    </Text>
  );

  return (
    <AuthContainer>
      <FormWrapper
        title="Восстановление пароля"
        slotButtons={slotButtonsContent}
        slotFooter={slotFooterContent}
        slotErrors={slotErrorsContent}
        onSubmit={handleFormSubmit}
      >
        <Input
          name="email"
          value={formState.email}
          type="email"
          placeholder="E-mail"
          onChange={onFormInputChange}
        />
      </FormWrapper>
    </AuthContainer>
  );
};
