import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient/burger-ingredient.tsx';
import { DraggableIngredient } from '@components/burger-ingredients/burger-ingredient/draggable-ingredient/draggable-ingredient.tsx';
import { setSelectedIngredient } from '@services/store/slices/selected-ingredient.ts';

import type { TIngredient, TIngredientType } from '@shared/types/entities.ts';

import styles from './burger-ingredients-section.module.css';

type TBurgerIngredientsSectionProps = {
  title: string;
  items: TIngredient[];
  headerId: TIngredientType;
  setHeaderRef?: (key: TIngredientType, ref: HTMLHeadingElement) => void;
};

export const BurgerIngredientsSection = memo(function BurgerIngredientsSection({
  title,
  items,
  headerId,
  setHeaderRef,
}: TBurgerIngredientsSectionProps): React.JSX.Element {
  const dispatch = useDispatch();

  const handleIngredientClick = useCallback(
    (ingredient: TIngredient): void => {
      dispatch(setSelectedIngredient(ingredient));
    },
    [dispatch]
  );

  return (
    <section>
      <h2
        id={headerId}
        ref={(el) => {
          setHeaderRef?.(headerId, el!);
        }}
        className={`text text_type_main-medium`}
      >
        {title}
      </h2>

      <ul className={`${styles.list}`}>
        {items.map((ingredient: TIngredient) => (
          <li key={ingredient._id}>
            <DraggableIngredient
              ingredient={ingredient}
              type={ingredient.type === 'bun' ? 'bun' : 'ingredient'}
            >
              <BurgerIngredient
                ingredient={ingredient}
                onClick={handleIngredientClick}
              />
            </DraggableIngredient>
          </li>
        ))}
      </ul>
    </section>
  );
});
