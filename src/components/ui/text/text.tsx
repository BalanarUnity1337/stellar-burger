type TPossibleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

type TTextProps = {
  children: React.ReactNode;
  as?: TPossibleTags;
  size?: 'small' | 'default' | 'medium' | 'large';
  color?: 'primary' | 'inactive' | 'accent' | 'error' | 'success';
  extraClass?: string;
};

import styles from './text.module.css';

export const Text = ({
  children,
  as: Tag = 'p',
  size = 'default',
  color = 'primary',
  extraClass = '',
}: TTextProps): React.JSX.Element => {
  const className = `text text_type_main-${size} ${styles[`text_${color}`]} ${extraClass ?? ''}`;

  return <Tag className={className}>{children}</Tag>;
};
