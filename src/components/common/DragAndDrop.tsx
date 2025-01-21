import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DragAndDropProps {
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
  className?: string;
  dragHandleRef?: React.RefObject<HTMLDivElement>;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  index,
  moveItem,
  children,
  className,
  dragHandleRef,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'accordion-item',
    item: { index },
    canDrag: (monitor) => {
      return dragHandleRef?.current
        ? dragHandleRef.current.contains(
            document.elementFromPoint(
              monitor.getInitialClientOffset()?.x ?? 0,
              monitor.getInitialClientOffset()?.y ?? 0,
            ) || null,
          )
        : false;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'accordion-item',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        // console.log('Dragging from:', draggedItem.index, 'to:', index);

        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? 'gray' : 'white',
        transition: 'all ease-in-out 0.2s',
      }}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
