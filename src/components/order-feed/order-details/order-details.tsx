import {
  CurrencyIcon,
  FormattedDate,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';

import { OrderDetailsIngredient } from '@components/order-feed/order-details/order-details-ingredient/order-details-ingredient.tsx';
import { OrderStatus } from '@components/order-feed/ui/order-status/order-status.tsx';
import { Digits } from '@components/ui/digits/digits.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { useGetIngredientsQuery } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';
import { ingredientsSelectors } from '@services/store/selectors';

import type { TOrderDetailsIngredient, TOrderDetails } from '@shared/types/entities.ts';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  order: TOrderDetails;
  showOrderNumber?: boolean;
};

export const OrderDetails = ({
  order,
  showOrderNumber = true,
}: TOrderDetailsProps): React.JSX.Element => {
  const { isLoading: isIngredientsLoading, isError: isIngredientsError } =
    useGetIngredientsQuery();
  const ingredientsById = useAppSelector(ingredientsSelectors.selectEntities);

  if (isIngredientsLoading) {
    return (
      <div className={`content-preloader`}>
        <Preloader />
      </div>
    );
  }

  if (isIngredientsError) {
    return <Text size="large">Не удалось получить данные о заказе</Text>;
  }

  const qtyById = order.ingredients.reduce(
    (acc, ingredientId) => ({
      ...acc,

      [ingredientId]: (acc[ingredientId] ?? 0) + 1,
    }),
    {} as Record<string, number>
  );

  const ingredients = [...new Set(order.ingredients)]
    .map((ingredientId) => {
      const ingredient = ingredientsById[ingredientId];

      return ingredient
        ? {
            image: ingredient.image,
            name: ingredient.name,
            id: ingredient._id,
            price: ingredient.price,
            qty: qtyById[ingredientId],
          }
        : null;
    })
    .filter(Boolean) as TOrderDetailsIngredient[];

  const price = order.ingredients.reduce(
    (acc, ingredientId) => acc + ingredientsById[ingredientId].price,
    0
  );

  return (
    <article className={`${styles.order}`}>
      {showOrderNumber && (
        <Digits as="strong" extraClass={`${styles.order_number}`}>
          {`#${order.number}`}
        </Digits>
      )}

      <header className={`${styles.order_header}`}>
        <Text as="h2" size="medium">
          {order.name}
        </Text>

        <OrderStatus status={order.status} />
      </header>

      <section className={`${styles.order_composition}`}>
        <Text as="h3" size="medium">
          Состав:
        </Text>

        <ul className={`${styles.order_ingredients}`}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              <OrderDetailsIngredient ingredient={ingredient} />
            </li>
          ))}
        </ul>
      </section>

      <footer className={`${styles.order_footer}`}>
        <Text as="span" color="inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </Text>

        <span className={`${styles.order_price}`}>
          <Digits formatted>{price}</Digits>
          <CurrencyIcon type="primary" />
        </span>
      </footer>
    </article>
  );
};
