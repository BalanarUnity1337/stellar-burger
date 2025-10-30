import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-ingredient.module.css';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
};

export const BurgerIngredient = ({
  ingredient,
}: TBurgerIngredientProps): React.JSX.Element => {
  return (
    <article className={styles.card}>
      <Counter count={1} />

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
};
