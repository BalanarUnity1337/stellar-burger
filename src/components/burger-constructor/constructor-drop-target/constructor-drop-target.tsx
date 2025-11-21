import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import type { BurgerConstructorDnDType, TIngredient } from '@shared/types.ts';

import styles from './constructor-drop-target.module.css';

type TConstructorEmptyElementProps = {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  acceptType: BurgerConstructorDnDType;
  placeholderText?: string;
  extraClass?: string;
  onDrop?: (ingredient: TIngredient, type: BurgerConstructorDnDType) => void;
};

type TCollectedProps = {
  isCanDrop: boolean;
  isOver: boolean;
};

type TDropItemProps = {
  ingredient: TIngredient;
  type: BurgerConstructorDnDType;
};

export const ConstructorDropTarget = ({
  children,
  position,
  acceptType,
  extraClass,
  placeholderText,
  onDrop,
}: TConstructorEmptyElementProps): React.JSX.Element => {
  const [{ isCanDrop, isOver }, dropConnector] = useDrop(() => ({
    accept: acceptType,
    drop: (item: TDropItemProps): TDropItemProps => {
      onDrop?.(item.ingredient, item.type);

      return item;
    },
    collect: (monitor): TCollectedProps => ({
      isCanDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  const dropRef = useRef<HTMLDivElement | null>(null);
  dropConnector(dropRef);

  const className = [
    styles.dropTarget,
    position === 'top' ? styles.dropTarget_top : '',
    position === 'bottom' ? styles.dropTarget_bottom : '',
    isCanDrop ? styles.canDrop : '',
    isOver ? styles.isOver : '',
    extraClass ?? '',
  ].join(' ');

  return (
    <div ref={dropRef} className={className}>
      {children ?? <div className={`${styles.placeholder}`}>{placeholderText}</div>}
    </div>
  );
};
