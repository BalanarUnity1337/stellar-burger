import { useForm, useToggleFieldEdit } from '@/hooks';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import { selectUser } from '@services/store/slices/auth.ts';

import styles from './profile-edit.module.css';

export const ProfileEdit = (): React.JSX.Element => {
  const userInfo = useSelector(selectUser);

  const { formState, onFormInputChange } = useForm({
    name: userInfo!.name,
    email: userInfo!.email,
    password: '',
  });

  const {
    isEdit: isCanEditNameField,
    toggleFieldEdit: toggleNameFieldEdit,
    ref: nameFieldRef,
  } = useToggleFieldEdit(false);

  const onFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
  };

  return (
    <form className={`${styles.form}`} onSubmit={onFormSubmit}>
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
    </form>
  );
};
