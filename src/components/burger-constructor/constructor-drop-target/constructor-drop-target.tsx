import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import type { TIngredient } from '@shared/types/entities.ts';
import type { BurgerConstructorDnDType } from '@shared/types/global.ts';

import styles from './constructor-drop-target.module.css';

type TConstructorEmptyElementProps = React.ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  acceptType: BurgerConstructorDnDType;
  placeholderText?: string;
  extraClass?: string;
  onDropElement?: (ingredient: TIngredient, type: BurgerConstructorDnDType) => void;
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
  onDropElement,
  ...restProps
}: TConstructorEmptyElementProps): React.JSX.Element => {
  const [{ isCanDrop, isOver }, dropConnector] = useDrop(() => ({
    accept: acceptType,
    drop: (item: TDropItemProps): TDropItemProps => {
      onDropElement?.(item.ingredient, item.type);

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
    <div ref={dropRef} className={className} {...restProps}>
      {children ?? <div className={`${styles.placeholder}`}>{placeholderText}</div>}
    </div>
  );
};
