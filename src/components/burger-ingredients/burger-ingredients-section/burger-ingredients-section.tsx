import { setSelectedIngredient } from '@/store/slices/selected-ingredient.ts';
import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient/burger-ingredient.tsx';

import type { TIngredient } from '@shared/types.ts';

import styles from './burger-ingredients-section.module.css';

type TBurgerIngredientsSectionProps = {
  title: string;
  items: TIngredient[];
};

export const BurgerIngredientsSection = memo(function BurgerIngredientsSection({
  title,
  items,
}: TBurgerIngredientsSectionProps): React.JSX.Element {
  const dispatch = useDispatch();

  const handleIngredientClick = useCallback(
    (ingredient: TIngredient): void => {
      dispatch(setSelectedIngredient(ingredient));
    },
    [dispatch]
  );

  return (
    <>
      <section>
        <h2 className={`text text_type_main-medium`}>{title}</h2>

        <ul className={`${styles.list}`}>
          {items.map((ingredient: TIngredient) => (
            <li key={ingredient._id}>
              <BurgerIngredient
                ingredient={ingredient}
                onClick={handleIngredientClick}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
});
