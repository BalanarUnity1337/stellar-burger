import { formatNumber } from '@shared/utils';

import styles from './digits.module.css';

type TPossibleTags = 'span' | 'dd' | 'output' | 'p' | 'div' | 'strong';

type TDigitsProps = {
  children: number | string;
  as?: TPossibleTags;
  size?: 'default' | 'medium' | 'large';
  color?: 'primary' | 'inactive' | 'accent' | 'error' | 'success';
  glow?: boolean;
  formatted?: boolean;
  extraClass?: string;
};

export const Digits = ({
  children,
  as: Tag = 'span',
  size = 'default',
  color = 'primary',
  glow = false,
  formatted = false,
  extraClass,
}: TDigitsProps): React.JSX.Element => {
  const value = formatted ? formatNumber(children) : children;

  const className = [
    styles.digits,
    `text_type_digits-${size}`,
    `${styles[`digits_${color}`]}`,
    glow ? styles.glow : '',
    extraClass ?? '',
  ].join(' ');

  return <Tag className={className}>{value}</Tag>;
};
