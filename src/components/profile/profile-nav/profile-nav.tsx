import { RouterPaths } from '@/router';
import { NavLink, useLocation } from 'react-router';

import { Text } from '@components/ui/text/text.tsx';

import styles from './profile-nav.module.css';

const links = [
  {
    name: 'Профиль',
    path: RouterPaths.profile,
    description: 'В этом разделе вы можете изменить свои персональные данные',
  },
  {
    name: 'История заказов',
    path: RouterPaths.orders,
    description: 'В этом разделе вы можете просмотреть свою историю заказов',
  },
];

export const ProfileNav = (): React.JSX.Element => {
  const location = useLocation();

  const logout = (e: React.SyntheticEvent): void => {
    e.preventDefault();
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

        <button className={`${styles.navLink}`} onClick={logout}>
          Выход
        </button>
      </nav>

      {description && (
        <Text isInactive={true} extraClass={`${styles.navText}`}>
          {description}
        </Text>
      )}
    </aside>
  );
};
