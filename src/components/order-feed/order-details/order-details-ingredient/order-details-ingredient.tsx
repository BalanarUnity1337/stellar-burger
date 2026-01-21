import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { IngredientIcon } from '@components/order-feed/ui/ingredient-icon/ingredient-icon.tsx';
import { Digits } from '@components/ui/digits/digits.tsx';
import { Text } from '@components/ui/text/text.tsx';

import type { TOrderDetailsIngredient } from '@shared/types/entities.ts';

import styles from './order-details-ingredient.module.css';

type TOrderDetailsIngredientProps = {
  ingredient: TOrderDetailsIngredient;
};

export const OrderDetailsIngredient = ({
  ingredient,
}: TOrderDetailsIngredientProps): React.JSX.Element => {
  return (
    <div className={`${styles.ingredient}`}>
      <IngredientIcon image={ingredient.image} name={ingredient.name} />

      <Text as="span" extraClass={`${styles.title}`}>
        {ingredient.name}
      </Text>

      <span className={`${styles.cost}`}>
        {ingredient.qty}&nbsp;x&nbsp;<Digits formatted>{ingredient.price}</Digits>
        <CurrencyIcon type="primary" className={`ml-2`} />
      </span>
    </div>
  );
};
