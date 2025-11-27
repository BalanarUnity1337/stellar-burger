import { Outlet } from 'react-router';

import { AppHeader } from '@components/app-header/app-header.tsx';

import styles from './default.module.css';

export const DefaultLayout = (): React.JSX.Element => {
  return (
    <div className={`${styles.layout}`}>
      <AppHeader />

      <main className={`${styles.main}`}>
        <Outlet />
      </main>
    </div>
  );
};
