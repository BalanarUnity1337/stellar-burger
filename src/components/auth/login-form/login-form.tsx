import { useForm } from '@/hooks';
import { RouterPaths } from '@/router/path.ts';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/auth/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';

export const LoginForm = (): React.JSX.Element => {
  const { formState, onFormInputChange } = useForm({
    email: '',
    password: '',
  });

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
          <Link className={`link ml-2`} to={RouterPaths.register}>
            Зарегистрироваться
          </Link>
        </Text>

        <Text isInactive={true}>
          Забыли пароль?
          <Link className={`link ml-2`} to={RouterPaths.forgotPassword}>
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
