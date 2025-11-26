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

export const LoginForm = (): React.JSX.Element => {
  const [state, setState] = useState({
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
        Войти
      </Button>
    ),
    []
  );

  const slotFooterContent = useMemo(
    () => (
      <>
        <Text isInactive={true}>
          Вы - новый пользователь?
          <Link className={`link ml-2`} to={Routes.register}>
            Зарегистрироваться
          </Link>
        </Text>

        <Text isInactive={true}>
          Забыли пароль?
          <Link className={`link ml-2`} to={Routes.forgotPassword}>
            Восстановить пароль
          </Link>
        </Text>
      </>
    ),
    []
  );

  return (
    <AuthContainer>
      <FormWrapper
        title="Вход"
        slotButtons={slotButtonsContent}
        slotFooter={slotFooterContent}
      >
        <Input
          name="email"
          value={state.email}
          type="email"
          placeholder="E-mail"
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
