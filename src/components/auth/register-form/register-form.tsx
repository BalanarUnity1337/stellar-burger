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
import { useRegisterMutation } from '@services/store/api';

import type { TRedirectLocationState } from '@shared/types/global.ts';
import type { Location } from 'react-router';

export const RegisterForm = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation() as Location<TRedirectLocationState>;

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

      const data = await register(formState).unwrap();

      if (data.success) {
        const redirectPath = location.state?.redirect;

        await navigate(redirectPath ?? RouterPaths.home);
      }
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
      extraClass={`ml-auto mr-auto`}
    >
      Зарегистрироваться
    </Button>
  );

  const slotErrorsContent = formError && (
    <Text color="error" size="small">
      {formError}
    </Text>
  );

  const slotFooterContent = (
    <Text color="inactive">
      Уже зарегистрированы?
      <Link className={`link ml-2`} to={RouterPaths.login} state={{ ...location.state }}>
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
