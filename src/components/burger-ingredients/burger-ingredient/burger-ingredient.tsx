import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectIngredientsQtyMap } from '@services/store/slices/burger-constructor.ts';

import type { TIngredient } from '@shared/types.ts';

import styles from './burger-ingredient.module.css';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  onClick?: (ingredient: TIngredient) => void;
};

export const BurgerIngredient = memo(function BurgerIngredient({
  ingredient,
  onClick,
}: TBurgerIngredientProps): React.JSX.Element {
  const ingredientsQty = useSelector(selectIngredientsQtyMap);

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();

    onClick?.(ingredient);
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      {ingredientsQty[ingredient._id] && (
        <Counter count={ingredientsQty[ingredient._id]} />
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
