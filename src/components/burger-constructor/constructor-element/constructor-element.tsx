import {
  ConstructorElement as UiConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { memo, useCallback, useMemo } from 'react';

import type { TConstructorIngredient } from '@shared/types.ts';

import styles from './constructor-element.module.css';

type TConstructorElementProps = {
  ingredient: TConstructorIngredient;
  isSortable?: boolean;
  isLocked?: boolean;
  position?: 'top' | 'bottom';
  onDelete?: (ingredient: TConstructorIngredient) => void;
};

const MemoConstructorElement = memo(UiConstructorElement);

export const ConstructorElement = ({
  ingredient,
  position,
  isSortable,
  isLocked,
  onDelete,
}: TConstructorElementProps): React.JSX.Element => {
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
  }, [ingredient, onDelete]);

  return (
    <div className={`${styles.constructorElement}`}>
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
};
