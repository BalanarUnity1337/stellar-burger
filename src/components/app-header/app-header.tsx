import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <div className={`${styles.menu_part}`}>
          <a href="/" className={`${styles.link} ${styles.link_active} p-5`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>

          <a href="/feed" className={`${styles.link} ml-2 p-5`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </a>
        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={`${styles.menu_part} ${styles.menu_part_right}`}>
          <a href="/profile" className={`${styles.link} p-5`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  );
};
