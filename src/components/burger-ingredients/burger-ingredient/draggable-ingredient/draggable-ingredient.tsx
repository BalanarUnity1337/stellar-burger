import { useRef } from 'react';
import { useDrag } from 'react-dnd';

import type { BurgerConstructorDnDType, TIngredient } from '@shared/types.ts';

import styles from './draggable-ingredient.module.css';

type DraggableIngredientProps = {
  children: React.ReactNode;
  type: BurgerConstructorDnDType;
  ingredient: TIngredient;
};

type TCollectedProps = { isDragging: boolean };

export const DraggableIngredient = ({
  type,
  ingredient,
  children,
}: DraggableIngredientProps): React.JSX.Element => {
  const [{ isDragging }, dragConnector] = useDrag(() => ({
    type,
    item: { ingredient, type },
    collect: (monitor): TCollectedProps => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const dragRef = useRef<HTMLDivElement | null>(null);
  dragConnector(dragRef);

  const className = `${styles.draggableIngredient} ${isDragging ? styles.isDragging : ''}`;

  return (
    <div ref={dragRef} className={className}>
      {children}
    </div>
  );
};
