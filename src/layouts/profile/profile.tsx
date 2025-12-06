import { Outlet } from 'react-router';

import { ProfileNav } from '@components/profile/profile-nav/profile-nav.tsx';

import styles from './profile.module.css';

export const ProfileLayout = (): React.JSX.Element => {
  return (
    <section className={`${styles.layout}`}>
      <ProfileNav />

      <Outlet />
    </section>
  );
};
