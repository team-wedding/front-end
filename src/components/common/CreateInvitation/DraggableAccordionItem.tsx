import React from 'react';
import DragAndDrop from '../DragAndDrop';
import { AccordionItemData } from '@constants/accordionData';
import { useToggleFeatureStore } from '@store/OptionalFeature/useToggleFeatureStore.';
import Toggle from '@/components/common/Toggle/Toggle';
import { ChevronRight, GripVertical } from 'lucide-react';
import { contentMap } from '@/constants/accordionContentMap';

export interface DraggableAccordionItemProps {
  item: AccordionItemData;
  index: number;
  expandedIds: number[];
  toggleExpand: (id: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableAccordionItem = ({
  item,
  index,
  expandedIds,
  toggleExpand,
  moveItem,
}: DraggableAccordionItemProps) => {
  const { isFeatureActive, handleToggle } = useToggleFeatureStore(item.feature);
  const dragHandleRef = React.useRef<HTMLDivElement>(null);
  const isExpanded = expandedIds.includes(item.id);

  return (
    <div className="glass-card">
      <DragAndDrop
        index={index}
        moveItem={moveItem}
        dragHandleRef={dragHandleRef}
      >
        <div
          className={`px-4 py-4 rounded-xl cursor-pointer`}
          onClick={() => toggleExpand(item.id)}
          role="button"
          aria-expanded={isExpanded}
          aria-controls={`accordion-content-${item.id}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-center space-x-2">
              <div className="cursor-grab" ref={dragHandleRef}>
                <GripVertical className="text-slate-900/20 w-5 mx-1  active:text-slate-500" />
              </div>
              <div className="font-medium text-slate-800 text-sm">
                {item.title}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {item.hasToggle && (
                <Toggle state={isFeatureActive} setState={handleToggle} />
              )}
              <ChevronRight
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedIds.includes(item.id) ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {isExpanded && (
          <div id={`accordion-content-${item.id}`} className="pt-2">
            <div className="bg-white/20 backdrop-blur-xl rounded-b-xl px-6 py-6">
              {contentMap[item.feature]}
            </div>
          </div>
        )}
      </DragAndDrop>
    </div>
  );
};
