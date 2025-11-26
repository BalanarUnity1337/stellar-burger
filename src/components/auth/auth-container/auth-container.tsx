import styles from './auth-container.module.css';

type TAuthContainerProps = {
  children: React.ReactNode;
};

export const AuthContainer = ({ children }: TAuthContainerProps): React.JSX.Element => {
  return <div className={`${styles.container}`}>{children}</div>;
};
