type TTextProps = {
  children: React.ReactNode;
  isInactive?: boolean;
  size?: 'small' | 'default' | 'medium' | 'large';
  extraClass?: string;
};

export const Text = ({
  children,
  size = 'default',
  isInactive = false,
  extraClass = '',
}: TTextProps): React.JSX.Element => {
  const className = `text text_type_main-${size} ${isInactive ? 'text_color_inactive' : ''} ${extraClass ?? ''}`;

  return <p className={className}>{children}</p>;
};
