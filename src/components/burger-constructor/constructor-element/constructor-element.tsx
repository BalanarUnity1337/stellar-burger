import { memo } from 'react';

import { ConstructorElementUi } from '@components/burger-constructor/constructor-element/constructor-element-ui/constructor-element-ui.tsx';
import { SortableConstructorElement } from '@components/burger-constructor/constructor-element/sortable-constructor-element/sortable-constructor-element.tsx';

import type { TConstructorIngredient } from '@shared/types/entities.ts';
import type {
  TEndMoveElementPayload,
  TMoveElementPayload,
} from '@shared/types/global.ts';

type TBaseProps = {
  ingredient: TConstructorIngredient;
  position?: 'top' | 'bottom';
  isLocked?: boolean;
  onDelete?: (ingredient: TConstructorIngredient) => void;
};

type TSortableProps = TBaseProps & {
  isSortable: true;
  index: number;
  onMoveElement: (payload: TMoveElementPayload) => void;
  onEndMove: (payload: TEndMoveElementPayload) => void;
};

type TNonSortableProps = TBaseProps & {
  isSortable: false;
};

type TConstructorElementProps = TSortableProps | TNonSortableProps;

export const ConstructorElement = memo(function ConstructorElement(
  props: TConstructorElementProps
) {
  const { ingredient, isSortable, isLocked, onDelete, position } = props;

  if (isSortable) {
    const { index, onMoveElement, onEndMove } = props;

    return (
      <SortableConstructorElement
        id={ingredient.uid}
        index={index}
        moveElement={onMoveElement}
        onEndMove={onEndMove}
      >
        <ConstructorElementUi
          ingredient={ingredient}
          isLocked={isLocked}
          position={position}
          isSortable={isSortable}
          onDelete={onDelete}
          data-cy={`ingredient-${ingredient._id}`}
        />
      </SortableConstructorElement>
    );
  }

  return (
    <ConstructorElementUi
      ingredient={ingredient}
      isLocked={isLocked}
      onDelete={onDelete}
      position={position}
      isSortable={isSortable}
      data-cy={`ingredient-${ingredient._id}`}
    />
  );
});
