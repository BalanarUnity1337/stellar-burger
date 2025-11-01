import { memo, useCallback, useState } from 'react';

import { BurgerIngredient } from '@components/burger-ingredients/burger-ingredient/burger-ingredient.tsx';
import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-ingredients-section.module.css';

type TBurgerIngredientsSectionProps = {
  title: string;
  items: TIngredient[];
};

export const BurgerIngredientsSection = memo(function BurgerIngredientsSection({
  title,
  items,
}: TBurgerIngredientsSectionProps): React.JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [ingredientToShow, setIngredientToShow] = useState<TIngredient | null>(null);

  const handleIngredientClick = useCallback((ingredient: TIngredient): void => {
    setIngredientToShow(ingredient);
    setIsModalVisible(true);
  }, []);

  const handleModalClose = (): void => {
    setIsModalVisible(false);
  };

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

      {isModalVisible && ingredientToShow && (
        <Modal title="Детали ингредиента" onClose={handleModalClose}>
          <IngredientDetails ingredient={ingredientToShow} />
        </Modal>
      )}
    </>
  );
});
