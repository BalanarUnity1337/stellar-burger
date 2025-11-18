import {
  addBurgerIngredient,
  deleteBurgerIngredient,
  selectBun,
  selectBurgerIngredients,
  setBun,
} from '@/store/slices/burger-constructor.ts';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructorOrder } from '@components/burger-constructor/burger-constructor-order/burger-constructor-order.tsx';
import { ConstructorDropTarget } from '@components/burger-constructor/constructor-drop-target/constructor-drop-target.tsx';
import { ConstructorElement } from '@components/burger-constructor/constructor-element/constructor-element.tsx';

import type {
  BurgerConstructorDnDType,
  TConstructorIngredient,
  TIngredient,
} from '@shared/types.ts';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const selectedBun = useSelector(selectBun);
  const ingredients = useSelector(selectBurgerIngredients);

  const handleIngredientDrop = useCallback(
    (ingredient: TIngredient, type: BurgerConstructorDnDType) => {
      if (type === 'bun') {
        dispatch(setBun(ingredient));
      } else if (type === 'ingredient') {
        dispatch(addBurgerIngredient(ingredient));
      }
    },
    [dispatch]
  );

  const handleIngredientDelete = useCallback(
    (ingredient: TConstructorIngredient) => {
      dispatch(deleteBurgerIngredient(ingredient.uid));
    },
    [dispatch]
  );

  const ingredientsListContent = useMemo(
    () =>
      ingredients.length > 0 ? (
        <ul className={`custom-scroll ${styles.inner_ingredients}`}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.uid}>
              <ConstructorElement
                ingredient={ingredient}
                isSortable={true}
                onDelete={handleIngredientDelete}
              />
            </li>
          ))}
        </ul>
      ) : null,
    [ingredients]
  );

  return (
    <section className={`pl-4 ${styles.burger_constructor}`}>
      <ConstructorDropTarget
        acceptType="bun"
        position="top"
        placeholderText="Перетащите булку сюда"
        extraClass={`mb-4`}
        droppedContent={
          selectedBun && (
            <ConstructorElement
              ingredient={selectedBun}
              position="top"
              isLocked={true}
            />
          )
        }
        onDrop={handleIngredientDrop}
      />

      <ConstructorDropTarget
        acceptType="ingredient"
        placeholderText="Перетащите соус или начинку сюда"
        droppedContent={ingredientsListContent}
        onDrop={handleIngredientDrop}
      />

      <ConstructorDropTarget
        acceptType="bun"
        position="bottom"
        placeholderText="Перетащите булку сюда"
        extraClass={`mt-4`}
        droppedContent={
          selectedBun && (
            <ConstructorElement
              ingredient={selectedBun}
              position="bottom"
              isLocked={true}
            />
          )
        }
        onDrop={handleIngredientDrop}
      />

      <BurgerConstructorOrder className={`mt-10`} />
    </section>
  );
};
