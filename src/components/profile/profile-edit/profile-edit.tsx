import { useForm, useToggleFieldEdit } from '@/hooks';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { normalizeApiError } from '@shared/utils';
import { useState } from 'react';

import { FormWrapper } from '@components/form-wrapper/form-wrapper.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useUpdateUserInfoMutation } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';
import { selectUser } from '@services/store/slices/auth.ts';

export const ProfileEdit = (): React.JSX.Element => {
  const userInfo = useAppSelector(selectUser);

  const { formState, onFormInputChange, isFormDirty, resetForm } = useForm({
    name: userInfo!.name,
    email: userInfo!.email,
    password: '',
  });

  const {
    isEdit: isCanEditNameField,
    toggleFieldEdit: toggleNameFieldEdit,
    ref: nameFieldRef,
  } = useToggleFieldEdit(false);

  const [formError, setFormError] = useState('');

  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

  const handleFormSubmit = async (): Promise<void> => {
    try {
      setFormError('');

      const data = await updateUserInfo(formState).unwrap();

      if (data.success) {
        resetForm({ ...data.user, password: '' });
      }
    } catch (e) {
      const apiError = normalizeApiError(e);

      setFormError(apiError.message!);
    }
  };

  const slotButtonsContent = isFormDirty && (
    <>
      <Button
        htmlType="reset"
        type="secondary"
        extraClass="ml-auto"
        onClick={() => resetForm()}
      >
        Отмена
      </Button>

      <Button htmlType="submit" type="primary" disabled={isLoading} extraClass="ml-5">
        Сохранить
      </Button>
    </>
  );

  const slotErrorsContent = formError && (
    <Text color="error" size="small">
      {formError}
    </Text>
  );

  return (
    <FormWrapper
      slotButtons={slotButtonsContent}
      slotErrors={slotErrorsContent}
      onSubmit={handleFormSubmit}
    >
      <Input
        ref={nameFieldRef}
        name="name"
        value={formState.name}
        placeholder="Имя"
        type="text"
        onChange={onFormInputChange}
        icon="EditIcon"
        disabled={!isCanEditNameField}
        onIconClick={toggleNameFieldEdit}
        onBlur={toggleNameFieldEdit}
      />

      <EmailInput
        name="email"
        value={formState.email}
        placeholder="Логин"
        isIcon={true}
        onChange={onFormInputChange}
      />

      <PasswordInput
        name="password"
        value={formState.password}
        placeholder="Пароль"
        onChange={onFormInputChange}
        icon="EditIcon"
      />
    </FormWrapper>
  );
};
