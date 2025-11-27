import { RouterPaths } from '@/router/path.ts';
import {
  PasswordInput,
  Input,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/auth/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';

export const ResetPasswordForm = (): React.JSX.Element => {
  const [state, setState] = useState({
    password: '',
    token: '',
  });

  const onInputChange = useCallback((e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;

    setState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }, []);

  const slotButtonsContent = useMemo(
    () => (
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
    ),
    []
  );

  const slotFooterContent = useMemo(
    () => (
      <Text isInactive={true}>
        Вспомнили пароль?
        <Link className={`link ml-2`} to={RouterPaths.login}>
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
        <PasswordInput
          name="password"
          value={state.password}
          placeholder="Введите новый пароль"
          onChange={onInputChange}
        />
        <Input
          type="text"
          value={state.token}
          placeholder="Введите код из письма"
          onChange={onInputChange}
        />
      </FormWrapper>
    </AuthContainer>
  );
};
