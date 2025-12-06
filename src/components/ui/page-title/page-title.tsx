import styles from './page-title.module.css';

type TTitleProps = {
  children: React.ReactNode;
  extraClass?: string;
};

export const PageTitle = ({
  children,
  extraClass = '',
}: TTitleProps): React.JSX.Element => {
  const className = `${styles.title} ${extraClass ?? ''}`;

  return <h1 className={className}>{children}</h1>;
};
