import {
  FormattedDate,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { IngredientIcon } from '@components/order-feed/ui/ingredient-icon/ingredient-icon.tsx';
import { OrderStatus } from '@components/order-feed/ui/order-status/order-status.tsx';
import { Digits } from '@components/ui/digits/digits.tsx';
import { Text } from '@components/ui/text/text.tsx';
import { ingredientsSelectors } from '@services/store/api';
import { useAppSelector } from '@services/store/hooks.ts';

import type { TOrderDetails } from '@shared/types/entities.ts';

import styles from './order-feed-card.module.css';

type TOrderFeedCardProps = {
  order: TOrderDetails;
  showStatus?: boolean;
  onClick?: (order: TOrderDetails) => void;
};

export const OrderFeedCard = ({
  order,
  showStatus = false,
  onClick,
}: TOrderFeedCardProps): React.JSX.Element => {
  const ingredientsById = useAppSelector(ingredientsSelectors.selectEntities);

  const price = useMemo(
    () =>
      order.ingredients.reduce(
        (acc, ingredientId) => acc + ingredientsById[ingredientId].price,
        0
      ),
    [order.ingredients]
  );

  const ingredients = useMemo(
    () =>
      order.ingredients.slice(0, 6).map((ingredientId) => ({
        id: ingredientId,
        name: ingredientsById[ingredientId].name,
        image: ingredientsById[ingredientId].image,
        uid: nanoid(),
      })),
    [order.ingredients]
  );

  const remainingIngredientsCount = order.ingredients.length - ingredients.length;

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();

    onClick?.(order);
  };

  const isInteractive = typeof onClick === 'function';

  return (
    <article
      className={`${styles.card} ${isInteractive && styles.interactive}`}
      onClick={handleClick}
    >
      <header className={`${styles.card_header}`}>
        <Digits>{`#${order.number}`}</Digits>

        <Text as="span" color="inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </Text>
      </header>

      <Text as="h2" size="medium">
        {order.name}
      </Text>

      {showStatus && <OrderStatus status={order.status} extraClass={`mt-2`} />}

      <footer className={`${styles.card_footer}`}>
        <ul className={`${styles.card_ingredients}`}>
          {ingredients.map(({ image, name, uid }, index) => (
            <li
              key={uid}
              className={`${styles.card_ingredient}`}
              style={{ zIndex: ingredients.length - index }}
            >
              <IngredientIcon image={image} name={name} />

              {remainingIngredientsCount > 0 && index === ingredients.length - 1 && (
                <Text as="span" extraClass={`${styles.card_ingredients_rest}`}>
                  +{remainingIngredientsCount}
                </Text>
              )}
            </li>
          ))}
        </ul>

        <span className={`${styles.card_price}`}>
          <Digits formatted>{price}</Digits>
          <CurrencyIcon type="primary" />
        </span>
      </footer>
    </article>
  );
};
