import React from 'react';
import DraggableAccordionItem from './DraggableAccordionItem';

export interface AccordionItemData {
  id: number;
  title: string;
  content: React.ReactNode;
  hasToggle?: boolean;
  hasDrag?: boolean;
}

interface AccordionProps {
  items: AccordionItemData[];
  expandedIds: number[];
  toggleExpand: (id: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  expandedIds,
  toggleExpand,
  moveItem,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <DraggableAccordionItem
          key={item.id}
          item={item}
          index={index}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};
