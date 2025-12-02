import { useForm } from '@/hooks';
import { RouterPaths } from '@/router';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { REFRESH_TOKEN_KEY } from '@shared/constants.ts';
import { normalizeApiError } from '@shared/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/auth/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useLoginMutation } from '@services/store/api';
import { setAccessToken, setUser } from '@services/store/slices/auth.ts';

import type { TLoginApiRequestParams } from '@shared/types/api.ts';

export const LoginForm = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { formState, onFormInputChange } = useForm({
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const handleFormSubmit = async (): Promise<void> => {
    try {
      setFormError('');

      const data = await login(formState satisfies TLoginApiRequestParams).unwrap();

      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setAccessToken(data.accessToken));

        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

        await navigate(RouterPaths.index);
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
    >
      Войти
    </Button>
  );

  const slotErrorsContent = (
    <>
      {formError && (
        <Text color="error" size="small">
          {formError}
        </Text>
      )}
    </>
  );

  const slotFooterContent = (
    <>
      <Text color="inactive">
        Вы - новый пользователь?
        <Link className={`link ml-2`} to={RouterPaths.register}>
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
