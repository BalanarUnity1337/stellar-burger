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
import { useRegisterMutation } from '@services/store/api';
import { setAccessToken, setUser } from '@services/store/slices/auth.ts';

import type { TRegisterApiRequestParams } from '@shared/types/api.ts';

export const RegisterForm = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { formState, onFormInputChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState('');

  const [register, { isLoading }] = useRegisterMutation();

  const handleFormSubmit = async (): Promise<void> => {
    try {
      setFormError('');

      const data = await register(
        formState satisfies TRegisterApiRequestParams
      ).unwrap();

      dispatch(setUser(data.user));
      dispatch(setAccessToken(data.accessToken));

      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

      await navigate(RouterPaths.index);
    } catch (e) {
      const apiError = normalizeApiError(e);

      setFormError(
        apiError.status == 403 ? 'Такой пользователь уже существует' : apiError.message!
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
      Зарегистрироваться
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
    <Text color="inactive">
      Уже зарегистрированы?
      <Link className={`link ml-2`} to={RouterPaths.login}>
        Войти
      </Link>
    </Text>
  );

  return (
    <AuthContainer>
      <FormWrapper
        title="Регистрация"
        slotButtons={slotButtonsContent}
        slotFooter={slotFooterContent}
        slotErrors={slotErrorsContent}
        onSubmit={handleFormSubmit}
      >
        <Input
          name="name"
          value={formState.name}
          placeholder="Имя"
          type="text"
          onChange={onFormInputChange}
        />

        <Input
          name="email"
          value={formState.email}
          placeholder="E-mail"
          type="email"
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
