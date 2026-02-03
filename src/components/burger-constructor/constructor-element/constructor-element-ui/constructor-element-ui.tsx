import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { memo, useCallback, useMemo } from 'react';

import type { TConstructorIngredient } from '@shared/types/entities.ts';

import styles from './constructor-element-ui.module.css';

type TConstructorElementUiProps = {
  ingredient: TConstructorIngredient;
  position?: 'top' | 'bottom';
  isSortable?: boolean;
  isLocked?: boolean;
  onDelete?: (ingredient: TConstructorIngredient) => void;
} & React.ComponentPropsWithoutRef<'div'>;

const MemoConstructorElement = memo(ConstructorElement);

export const ConstructorElementUi = memo(function ConstructorElementUi({
  ingredient,
  position,
  isSortable,
  isLocked,
  onDelete,
  ...restProps
}: TConstructorElementUiProps) {
  const text = useMemo(() => {
    if (ingredient.type === 'bun') {
      if (position === 'top') {
        return `${ingredient.name} (верх)`;
      }

      if (position === 'bottom') {
        return `${ingredient.name} (низ)`;
      }
    }

    return ingredient.name;
  }, [ingredient.type, ingredient.name]);

  const handleClose = useCallback(() => {
    onDelete?.(ingredient);
  }, [ingredient.uid, onDelete]);

  return (
    <div className={`${styles.element}`} {...restProps}>
      {isSortable && <DragIcon className={`${styles.dragIcon}`} type="primary" />}

      <MemoConstructorElement
        text={text}
        thumbnail={ingredient.image}
        price={ingredient.price}
        type={position}
        isLocked={isLocked}
        extraClass={`${styles.elementInfo}`}
        handleClose={handleClose}
      />
    </div>
  );
});
