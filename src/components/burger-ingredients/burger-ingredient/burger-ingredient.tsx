import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import { useAppSelector } from '@services/store/hooks.ts';
import { selectIngredientsQtyById } from '@services/store/slices/burger-constructor.ts';

import type { TIngredient } from '@shared/types/entities.ts';

import styles from './burger-ingredient.module.css';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  onClick?: (ingredient: TIngredient) => void;
};

export const BurgerIngredient = memo(function BurgerIngredient({
  ingredient,
  onClick,
}: TBurgerIngredientProps): React.JSX.Element {
  const ingredientsQtyById = useAppSelector(selectIngredientsQtyById);

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();

    onClick?.(ingredient);
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      {ingredientsQtyById[ingredient._id] && (
        <Counter count={ingredientsQtyById[ingredient._id]} />
      )}

      <img
        className={`${styles.photo}`}
        src={ingredient.image}
        alt={ingredient.name}
        width={240}
        height={120}
      />

      <p className={`text text_type_digits-default mt-1 ${styles.price}`}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </p>

      <h3 className={`text text_type_main-default mt-1 ${styles.title}`}>
        {ingredient.name}
      </h3>
    </article>
  );
});
