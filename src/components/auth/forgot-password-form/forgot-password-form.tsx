import { Routes } from '@/router/routes.ts';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/auth/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';

export const ForgotPasswordForm = (): React.JSX.Element => {
  const [state, setState] = useState({
    email: '',
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
        Восстановить
      </Button>
    ),
    []
  );

  const slotFooterContent = useMemo(
    () => (
      <Text isInactive={true}>
        Вспомнили пароль?
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
        title="Восстановление пароля"
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
      </FormWrapper>
    </AuthContainer>
  );
};
