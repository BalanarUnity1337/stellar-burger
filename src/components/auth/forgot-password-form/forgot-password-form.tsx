import { useForm } from '@/hooks';
import { RouterPaths } from '@/router/path.ts';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link } from 'react-router';

import { AuthContainer } from '@components/auth/auth-container/auth-container.tsx';
import { FormWrapper } from '@components/auth/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';

export const ForgotPasswordForm = (): React.JSX.Element => {
  const { formState, onFormInputChange } = useForm({
    email: '',
  });

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
        <Input
          name="email"
          value={formState.email}
          type="email"
          placeholder="E-mail"
          onChange={onFormInputChange}
        />
      </FormWrapper>
    </AuthContainer>
  );
};
