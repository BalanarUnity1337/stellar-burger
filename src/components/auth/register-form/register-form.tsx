import { Routes } from '@/router/routes.ts';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/auth/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';

export const RegisterForm = (): React.JSX.Element => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onInputChange = useCallback((e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }, []);

  const slotButtonsContent = useMemo(
    () => (
      <Button htmlType="submit" type="primary" size="medium">
        Зарегистрироваться
      </Button>
    ),
    []
  );

  const slotFooterContent = useMemo(
    () => (
      <Text isInactive={true}>
        Уже зарегистрированы?
        <Link className={`link ml-2`} to={Routes.login}>
          Войти
        </Link>
      </Text>
    ),
    []
  );

  return (
    <AuthContainer>
      <FormWrapper
        title="Регистрация"
        slotButtons={slotButtonsContent}
        slotFooter={slotFooterContent}
      >
        <Input
          name="name"
          value={state.name}
          placeholder="Имя"
          type="text"
          onChange={onInputChange}
        />
        <Input
          name="email"
          value={state.email}
          placeholder="E-mail"
          type="email"
          onChange={onInputChange}
        />
        <PasswordInput
          name="password"
          value={state.password}
          placeholder="Пароль"
          onChange={onInputChange}
        />
      </FormWrapper>
    </AuthContainer>
  );
};
