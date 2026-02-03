import { useRef } from 'react';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@shared/types/entities.ts';
import type { BurgerConstructorDnDType } from '@shared/types/global.ts';

import styles from './draggable-ingredient.module.css';

type DraggableIngredientProps = {
  children: React.ReactNode;
  type: BurgerConstructorDnDType;
  ingredient: TIngredient;
} & React.ComponentPropsWithoutRef<'div'>;

type TCollectedProps = { isDragging: boolean };

export const DraggableIngredient = ({
  type,
  ingredient,
  children,
  ...restProps
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
    <div ref={dragRef} className={className} {...restProps}>
      {children}
    </div>
  );
};
