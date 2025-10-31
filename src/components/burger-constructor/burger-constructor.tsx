import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  console.log(ingredients);
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
      <ConstructorElement
        extraClass="mb-4 ml-8 mr-4"
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

            <ConstructorElement
              text={ingredient.name}
              thumbnail={ingredient.image}
              price={ingredient.price}
            />
          </li>
        ))}
      </ul>

      <ConstructorElement
        extraClass="mt-4 ml-8"
        text={`${bun.name} (низ)`}
        thumbnail={bun.image}
        price={bun.price}
        type="bottom"
        isLocked={true}
      />

      <div className={`mt-10 ${styles.order_controls}`}>
        <output className={`text text_type_digits-medium ${styles.order_cost}`}>
          {totalCost}
          <CurrencyIcon type="primary" className={`${styles.order_cost_icon}`} />
        </output>

        <Button htmlType="button" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
