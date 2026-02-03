import { useCallback, useEffect, useMemo, useState } from 'react';

import { BurgerConstructorOrder } from '@components/burger-constructor/burger-constructor-order/burger-constructor-order.tsx';
import { ConstructorDropTarget } from '@components/burger-constructor/constructor-drop-target/constructor-drop-target.tsx';
import { ConstructorElement } from '@components/burger-constructor/constructor-element/constructor-element.tsx';
import { useAppDispatch, useAppSelector } from '@services/store/hooks.ts';
import {
  addBurgerIngredient,
  deleteBurgerIngredient,
  moveIngredient,
  selectBun,
  selectBurgerIngredients,
  setBun,
} from '@services/store/slices/burger-constructor.ts';

import type { TConstructorIngredient, TIngredient } from '@shared/types/entities.ts';
import type {
  BurgerConstructorDnDType,
  TEndMoveElementPayload,
  TMoveElementPayload,
} from '@shared/types/global.ts';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedBun = useAppSelector(selectBun);
  const ingredients = useAppSelector(selectBurgerIngredients);
  const [localIngredients, setLocalIngredients] = useState<TConstructorIngredient[]>([]);

  useEffect(() => {
    setLocalIngredients(ingredients);
  }, [ingredients]);

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

  const handleIngredientMove = useCallback(
    ({ dragIndex, hoverIndex }: TMoveElementPayload) => {
      setLocalIngredients((prev) => {
        const newIngredients = [...prev];
        const [removed] = newIngredients.splice(dragIndex, 1);

        newIngredients.splice(hoverIndex, 0, removed);

        return newIngredients;
      });
    },
    [dispatch]
  );

  const handleIngredientEndMove = useCallback(
    (payload: TEndMoveElementPayload) => {
      dispatch(moveIngredient(payload));
    },
    [dispatch]
  );

  const ingredientsListContent = useMemo(
    () =>
      localIngredients.length > 0 ? (
        <ul className={`custom-scroll ${styles.inner_ingredients}`}>
          {localIngredients.map((ingredient, index) => (
            <li key={ingredient.uid}>
              <ConstructorElement
                ingredient={ingredient}
                index={index}
                isSortable={true}
                onDelete={handleIngredientDelete}
                onMoveElement={handleIngredientMove}
                onEndMove={handleIngredientEndMove}
              />
            </li>
          ))}
        </ul>
      ) : null,
    [localIngredients]
  );

  return (
    <section className={`pl-4 ${styles.burger_constructor}`}>
      <ConstructorDropTarget
        acceptType="bun"
        position="top"
        placeholderText="Перетащите булку сюда"
        extraClass={`mb-4`}
        onDropElement={handleIngredientDrop}
        data-cy="drop-target-bun"
      >
        {selectedBun && (
          <ConstructorElement
            ingredient={selectedBun}
            position="top"
            isLocked={true}
            isSortable={false}
          />
        )}
      </ConstructorDropTarget>

      <ConstructorDropTarget
        acceptType="ingredient"
        placeholderText="Перетащите соус или начинку сюда"
        onDropElement={handleIngredientDrop}
        data-cy="drop-target-ingredients"
      >
        {ingredientsListContent}
      </ConstructorDropTarget>

      <ConstructorDropTarget
        acceptType="bun"
        position="bottom"
        placeholderText="Перетащите булку сюда"
        extraClass={`mt-4`}
        onDropElement={handleIngredientDrop}
      >
        {selectedBun && (
          <ConstructorElement
            ingredient={selectedBun}
            position="bottom"
            isLocked={true}
            isSortable={false}
          />
        )}
      </ConstructorDropTarget>

      <BurgerConstructorOrder className={`mt-10`} />
    </section>
  );
};
