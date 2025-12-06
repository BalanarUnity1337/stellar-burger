type TTextProps = {
  children: React.ReactNode;
  size?: 'small' | 'default' | 'medium' | 'large';
  color?: 'primary' | 'inactive' | 'accent' | 'error' | 'success';
  extraClass?: string;
};

import styles from './text.module.css';

export const Text = ({
  children,
  size = 'default',
  color = 'primary',
  extraClass = '',
}: TTextProps): React.JSX.Element => {
  const className = `text text_type_main-${size} ${styles[`text_${color}`]} ${extraClass ?? ''}`;

  return <p className={className}>{children}</p>;
};
