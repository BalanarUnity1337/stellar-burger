import { useForm } from '@/hooks';
import { RouterPaths } from '@/router';
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

export const RegisterForm = (): React.JSX.Element => {
  const { formState, onFormInputChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

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
        title="Регистрация"
        slotButtons={slotButtonsContent}
        slotFooter={slotFooterContent}
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
