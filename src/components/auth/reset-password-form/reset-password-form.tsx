import { useForm } from '@/hooks';
import { RouterPaths } from '@/router';
import {
  PasswordInput,
  Input,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { RESET_PASSWORD_KEY } from '@shared/constants.ts';
import { normalizeApiError } from '@shared/utils';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useSetNewPasswordMutation } from '@services/store/api';

export const ResetPasswordForm = (): React.JSX.Element => {
  const navigate = useNavigate();

  const { formState, onFormInputChange } = useForm({
    password: '',
    token: '',
  });

  const [formError, setFormError] = useState('');

  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();

  const handleFormSubmit = async (): Promise<void> => {
    try {
      setFormError('');

      const data = await setNewPassword(formState).unwrap();

      if (data.success) {
        localStorage.removeItem(RESET_PASSWORD_KEY);

        await navigate(RouterPaths.login, { replace: true });
      }
    } catch (e) {
      const apiError = normalizeApiError(e);

      setFormError(apiError.status === 404 ? 'Указан неверный код' : apiError.message!);
    }
  };

  const isSubmitButtonDisabled =
    isLoading || Object.values(formState).some((value) => value.length === 0);

  const slotButtonsContent = (
    <Button
      htmlType="submit"
      type="primary"
      size="medium"
      disabled={isSubmitButtonDisabled}
      extraClass={`ml-auto mr-auto`}
    >
      Сохранить
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
        <PasswordInput
          name="password"
          value={formState.password}
          placeholder="Введите новый пароль"
          onChange={onFormInputChange}
        />

        <Input
          name="token"
          type="text"
          value={formState.token}
          placeholder="Введите код из письма"
          onChange={onFormInputChange}
        />
      </FormWrapper>
    </AuthContainer>
  );
};
