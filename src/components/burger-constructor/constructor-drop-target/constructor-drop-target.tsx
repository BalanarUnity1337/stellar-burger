import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import type { BurgerConstructorDnDType, TIngredient } from '@shared/types.ts';

import styles from './constructor-drop-target.module.css';

type TConstructorEmptyElementProps = {
  position?: 'top' | 'bottom';
  acceptType: BurgerConstructorDnDType;
  placeholderText?: string;
  extraClass?: string;
  droppedContent?: React.ReactNode;
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
  position,
  acceptType,
  extraClass,
  placeholderText,
  droppedContent,
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
      {droppedContent ?? (
        <div className={`${styles.placeholder}`}>{placeholderText}</div>
      )}
    </div>
  );
};
