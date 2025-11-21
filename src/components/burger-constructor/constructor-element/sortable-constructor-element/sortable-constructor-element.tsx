import { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TEndMoveElementPayload, TMoveElementPayload } from '@shared/types.ts';
import type { XYCoord } from 'dnd-core';

import styles from './sortable-constructor-element.module.css';

type TSortableConstructorElementProps = {
  children: React.ReactNode;
  id: string;
  index: number;
  moveElement: (payload: TMoveElementPayload) => void;
  onEndMove: (payload: TEndMoveElementPayload) => void;
};

type TDragItem = {
  id: string;
  index: number;
};

type TCollectedDragProps = {
  isDragging: boolean;
};

export const SortableConstructorElement = memo(function SortableConstructorElement({
  children,
  id,
  index,
  moveElement,
  onEndMove,
}: TSortableConstructorElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragConnector] = useDrag<TDragItem, void, TCollectedDragProps>(
    () => ({
      type: 'constructor-element',
      item: { id, index },
      collect: (monitor): TCollectedDragProps => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index]
  );

  const [, dropConnector] = useDrop<TDragItem, void, unknown>(
    () => ({
      accept: 'constructor-element',
      drop: (item): void => {
        onEndMove({ dragItemId: item.id, targetIndex: index });
      },
      hover: (item, monitor): void => {
        if (!ref.current) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        if (hoverBoundingRect == null) {
          return;
        }

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveElement({ dragIndex, hoverIndex });

        item.index = hoverIndex;
      },
    }),
    [index]
  );

  dragConnector(dropConnector(ref));

  return (
    <div ref={ref} className={`${isDragging ? styles.isDragging : ''}`}>
      {children}
    </div>
  );
});
