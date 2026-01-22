import { RouterPaths } from '@/router';
import { REFRESH_TOKEN_KEY } from '@shared/constants.ts';
import { NavLink, useLocation, useNavigate } from 'react-router';

import { Text } from '@components/ui/text/text.tsx';
import { useLogoutMutation } from '@services/store/api';

import styles from './profile-nav.module.css';

const links = [
  {
    name: 'Профиль',
    path: RouterPaths.profile,
    description: 'В этом разделе вы можете изменить свои персональные данные',
  },
  {
    name: 'История заказов',
    path: RouterPaths.profileOrders,
    description: 'В этом разделе вы можете просмотреть свою историю заказов',
  },
];

export const ProfileNav = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logout, { isLoading: isLogoutProcessing }] = useLogoutMutation();

  const logoutHandler = async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      const data = await logout({ token: refreshToken ?? '' }).unwrap();

      if (data.success) {
        await navigate(RouterPaths.login);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onLogoutClick = (e: React.SyntheticEvent): void => {
    if (!isLogoutProcessing) {
      e.preventDefault();

      void logoutHandler();
    }
  };

  const linksContent = (
    <>
      {links.map(({ name, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLink_active : ''}`
          }
          end={true}
        >
          {name}
        </NavLink>
      ))}
    </>
  );

  const description = links.find(({ path }) => path === location.pathname)?.description;

  return (
    <aside>
      <nav className={`${styles.nav}`}>
        {linksContent}

        <button
          className={`${styles.navLink}`}
          disabled={isLogoutProcessing}
          onClick={onLogoutClick}
        >
          Выход
        </button>
      </nav>

      {description && (
        <Text color="inactive" extraClass={`${styles.navText}`}>
          {description}
        </Text>
      )}
    </aside>
  );
};
