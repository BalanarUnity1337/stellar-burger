import { RouterPaths } from '@/router';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router';

import type { NavLinkRenderProps } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const getLinkClassName = ({ isActive }: NavLinkRenderProps): string =>
    `${styles.link} ${isActive ? styles.link_active : ''}`;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <div className={`${styles.menu_part}`}>
          <NavLink className={getLinkClassName} to={RouterPaths.home}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </NavLink>

          <NavLink className={getLinkClassName} to={RouterPaths.feed}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={`${styles.menu_part} ${styles.menu_part_right}`}>
          <NavLink className={getLinkClassName} to={RouterPaths.profile}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
