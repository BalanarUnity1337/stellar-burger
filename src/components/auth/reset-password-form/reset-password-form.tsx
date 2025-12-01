import { useForm } from '@/hooks';
import { RouterPaths } from '@/router';
import {
  PasswordInput,
  Input,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/auth/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';

export const ResetPasswordForm = (): React.JSX.Element => {
  const { formState, onFormInputChange } = useForm({
    password: '',
    token: '',
  });

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
          value={formState.password}
          placeholder="Введите новый пароль"
          onChange={onFormInputChange}
        />
        <Input
          name="token"
          type="text"
          value={formState.token}
          placeholder="Введите код из письма"
          onChange={onFormInputChange}
        />
      </FormWrapper>
    </AuthContainer>
  );
};
