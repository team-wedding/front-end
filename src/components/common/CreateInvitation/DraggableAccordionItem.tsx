import React from 'react';
import DragAndDrop from '../DragAndDrop';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import Toggle from '../Toggle';
import { AccordionItemData } from '../../../constants/accordionData';
import { useToggleFeatureStore } from '../../../store/OptionalFeature/useToggleFeatureStore.';

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
  const dragHandleRef = React.useRef<HTMLDivElement>(null);
  const isExpanded = expandedIds.includes(item.id);

  // 선택 기능의 토글 상태
  const { isFeatureActive, handleToggle } = useToggleFeatureStore(item.feature);

  return (
    <div
      className={`accordion-item ${isExpanded ? 'max-h-160 ' : 'max-h-12'} `}
    >
      <DragAndDrop
        index={index}
        moveItem={moveItem}
        dragHandleRef={dragHandleRef}
      >
        <div
          className="flex rounded-2xl justify-between max-h-12 items-center p-6 cursor-pointer"
          onClick={() => toggleExpand(item.id)}
          role="button"
          aria-expanded={isExpanded} // 확장 상태 명시
          aria-controls={`accordion-content-${item.id}`}
        >
          <div className="flex-center gap-2">
            <div className="cursor-grab" ref={dragHandleRef}>
              <DragIndicatorRoundedIcon
                fontSize="small"
                className="text-gray-300 active:text-gray-500"
              />
            </div>
            <div className="font-semibold">{item.title}</div>
          </div>

          <div className="flex items-center gap-4">
            {item.hasToggle && (
              <Toggle state={isFeatureActive} setState={handleToggle} />
            )}
            <i
              className={`bx bx-chevron-down text-xl transition-all duration-300 ${expandedIds.includes(item.id) ? 'rotate-180' : ''
                }`}
            ></i>
          </div>
        </div>
      </DragAndDrop>

      {/* 콘텐츠 */}
      <div
        id={`accordion-content-${item.id}`} // 제목이랑 연결
        className={`px-5 pb-5 overflow-hidden transition-all duration-300 ease-in-out ${expandedIds.includes(item.id) ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div>{item.content}</div>
      </div>
    </div>
  );
};