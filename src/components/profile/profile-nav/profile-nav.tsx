import { RouterPaths } from '@/router/paths.ts';
import { NavLink } from 'react-router';

import { Text } from '@components/ui/text/text.tsx';

import styles from './profile-nav.module.css';

const links = [
  { name: 'Профиль', path: RouterPaths.profile },
  { name: 'История заказов', path: '/undefined-route' },
];

export const ProfileNav = (): React.JSX.Element => {
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
        >
          {name}
        </NavLink>
      ))}
    </>
  );

  return (
    <aside>
      <nav className={`${styles.nav}`}>
        {linksContent}

        <button className={`${styles.navLink}`} onClick={logout}>
          Выход
        </button>
      </nav>

      <Text isInactive={true} extraClass={`${styles.navText}`}>
        В этом разделе вы можете изменить свои персональные данные
      </Text>
    </aside>
  );
};
