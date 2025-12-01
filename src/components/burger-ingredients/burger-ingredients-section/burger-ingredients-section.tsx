import { createIngredientPageRoute } from '@/router';
import { memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';

import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient/burger-ingredient.tsx';
import { DraggableIngredient } from '@components/burger-ingredients/burger-ingredient/draggable-ingredient/draggable-ingredient.tsx';

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
  const navigate = useNavigate();
  const location = useLocation();

  const handleIngredientClick = useCallback((ingredient: TIngredient): void => {
    void navigate(createIngredientPageRoute(ingredient._id), {
      state: { background: location },
    });
  }, []);

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
