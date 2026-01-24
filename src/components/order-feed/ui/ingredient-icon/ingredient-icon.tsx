type TIngredientIconProps = {
  image: string;
  name: string;
};

import styles from './ingredient-icon.module.css';

export const IngredientIcon = ({
  image,
  name,
}: TIngredientIconProps): React.JSX.Element => {
  return (
    <div className={`${styles.ingredientIcon}`}>
      <img src={image} alt={name} width={112} height={56} />
    </div>
  );
};
