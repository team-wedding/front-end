import { AccordionItemData } from '@constants/accordionData';
import { AccordionItem } from './AccordionItem';
import { DraggableAccordionItem } from './DraggableAccordionItem';

export interface AccordionProps {
  items: AccordionItemData[];
  expandedIds: number[];
  toggleExpand: (id: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const Accordion = ({
  items,
  expandedIds,
  toggleExpand,
  moveItem,
}: AccordionProps) => {
  return (
    <div className="flex flex-col gap-2 max-w-md mx-auto pb-20">
      {items.map((item, index) =>
        item.hasDrag ? (
          <DraggableAccordionItem
            key={item.id}
            item={item}
            index={index}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            moveItem={moveItem}
          />
        ) : (
          <AccordionItem
            key={item.id}
            item={item}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
          />
        ),
      )}
    </div>
  );
};
