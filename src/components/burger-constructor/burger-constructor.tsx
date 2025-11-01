import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import { BurgerConstructorOrder } from '@components/burger-constructor/burger-constructor-order/burger-constructor-order.tsx';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

const MemoConstructorElement = memo(ConstructorElement);

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
  const innerIngredients = ingredients.filter((ingredient) =>
    (['main', 'sauce'] as TIngredient['type'][]).includes(ingredient.type)
  );
  const totalCost = innerIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (
    <section className={`pl-4 ${styles.burger_constructor}`}>
      <MemoConstructorElement
        extraClass="mb-4 ml-8"
        text={`${bun.name} (верх)`}
        thumbnail={bun.image}
        price={bun.price}
        type="top"
        isLocked={true}
      />

      <ul className={`custom-scroll ${styles.inner_ingredients}`}>
        {innerIngredients.map((ingredient) => (
          <li key={ingredient._id} className={styles.ingredient_item}>
            <DragIcon className={styles.drag_icon} type="primary" />

            <MemoConstructorElement
              text={ingredient.name}
              thumbnail={ingredient.image}
              price={ingredient.price}
            />
          </li>
        ))}
      </ul>

      <MemoConstructorElement
        extraClass="mt-4 ml-8"
        text={`${bun.name} (низ)`}
        thumbnail={bun.image}
        price={bun.price}
        type="bottom"
        isLocked={true}
      />

      <BurgerConstructorOrder className={`mt-10`} totalCost={totalCost} />
    </section>
  );
};
