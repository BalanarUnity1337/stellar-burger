import { useForm } from '@/hooks';
import { RouterPaths } from '@/router';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { normalizeApiError } from '@shared/utils';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useLoginMutation } from '@services/store/api';

import type { TRedirectLocationState } from '@shared/types/global.ts';
import type { Location } from 'react-router';

export const LoginForm = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation() as Location<TRedirectLocationState>;

  const { formState, onFormInputChange } = useForm({
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const handleFormSubmit = async (): Promise<void> => {
    try {
      setFormError('');

      const data = await login(formState).unwrap();

      if (data.success) {
        const redirectPath = location.state?.redirect;

        await navigate(redirectPath ?? RouterPaths.home);
      }
    } catch (e) {
      const apiError = normalizeApiError(e);

      setFormError(
        apiError.status === 401 ? 'Неверный E-mail или пароль' : apiError.message!
      );
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
      Войти
    </Button>
  );

  const slotErrorsContent = formError && (
    <Text color="error" size="small">
      {formError}
    </Text>
  );

  const slotFooterContent = (
    <>
      <Text color="inactive">
        Вы - новый пользователь?
        <Link
          className={`link ml-2`}
          to={RouterPaths.register}
          state={{ ...location.state }}
        >
          Зарегистрироваться
        </Link>
      </Text>

      <Text color="inactive">
        Забыли пароль?
        <Link className={`link ml-2`} to={RouterPaths.forgotPassword}>
          Восстановить пароль
        </Link>
      </Text>
    </>
  );

  return (
    <AuthContainer>
      <FormWrapper
        title="Вход"
        slotButtons={slotButtonsContent}
        slotErrors={slotErrorsContent}
        slotFooter={slotFooterContent}
        onSubmit={handleFormSubmit}
      >
        <Input
          name="email"
          value={formState.email}
          type="email"
          placeholder="E-mail"
          onChange={onFormInputChange}
        />

        <PasswordInput
          name="password"
          value={formState.password}
          placeholder="Пароль"
          onChange={onFormInputChange}
        />
      </FormWrapper>
    </AuthContainer>
  );
};
