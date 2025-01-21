import { useDrag, useDrop } from 'react-dnd';
import { AccordionItemData } from './Accordion';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { useRef } from 'react';
import Toggle from '../Toggle';

interface DraggableAccordionItemProps {
  item: AccordionItemData;
  index: number;
  expandedIds: number[];
  toggleExpand: (id: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableAccordionItem = ({
  item,
  index,
  expandedIds,
  toggleExpand,
  moveItem,
}: DraggableAccordionItemProps) => {
  // 드래그앤드롭
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'accordion-item',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'accordion-item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  // 기능 상태 가져오기
  const { selectedMainFeatures, toggleMainFeature } = useMainFeatureStore();

  const isMainFeatureActive =
    selectedMainFeatures[item.feature as keyof typeof selectedMainFeatures] ??
    false;

  const handleToggle = (enabled: boolean) => {
    toggleMainFeature(
      item.feature as keyof typeof selectedMainFeatures,
      enabled,
    );
  };

  return (
    <>
      {isDragging && <div className="h-3"></div>}
      <div
        ref={preview}
        className={`bg-white rounded-2xl overflow-hidden transition-all duration-100 text-gray-800 shadow-md ${expandedIds.includes(item.id) ? 'max-h-160' : 'max-h-12'
          } ${isDragging ? 'transition-transform ease-out' : ''}`}
        style={{
          zIndex: isDragging ? 100 : 1, // 드래그 중일 때 z-index를 높게 설정
          position: isDragging ? 'relative' : 'static', // 드래그 중인 항목은 상대적 위치
          opacity: isDragging ? 50 : '', // 드래그 중 투명도 조정
        }}
      >
        {/* 제목 및 토글 버튼 */}
        <div
          className="flex justify-between max-h-12 items-center p-6 cursor-pointer"
          onClick={() => toggleExpand(item.id)}
          role="button"
          aria-expanded={expandedIds.includes(item.id)} // 확장 상태 명시
          aria-controls={`accordion-content-${item.id}`}
        >
          <div className="flex items-center gap-2">
            {item.hasDrag && (
              <div
                ref={ref}
                className="cursor-grab"
                onClick={(e) => e.stopPropagation()}
              >
                <DragIndicatorRoundedIcon
                  fontSize="small"
                  className="text-gray-300"
                />
              </div>
            )}
            <div className="text-xs font-semibold">{item.title}</div>
          </div>

          <div className="flex items-center gap-4">
            {item.hasToggle && (
              <Toggle state={isMainFeatureActive} setState={handleToggle} />
            )}
            <i
              className={`bx bx-chevron-down text-xl transition-all duration-300 ${expandedIds.includes(item.id) ? 'rotate-180' : ''
                }`}
            ></i>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div
          id={`accordion-content-${item.id}`} // 제목이랑 연결
          className={`px-5 pb-5 overflow-hidden transition-all duration-300 ease-in-out ${expandedIds.includes(item.id) ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div>{item.content}</div>
        </div>
      </div>
    </>
  );
};

export default DraggableAccordionItem;
function useMainFeatureStore(): { selectedMainFeatures: any; toggleMainFeature: any; } {
  throw new Error('Function not implemented.');
}

