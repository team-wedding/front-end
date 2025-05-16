import Toggle from '@common/Toggle/OnOff';
import { useToggleFeatureStore } from '@store/OptionalFeature/useToggleFeatureStore.';
import { AccordionItemData } from '@constants/accordionData';

interface AccordionItemProps {
  item: AccordionItemData;
  expandedIds: number[];
  toggleExpand: (id: number) => void;
}

export const AccordionItem = ({
  item,
  expandedIds,
  toggleExpand,
}: AccordionItemProps) => {
  const isExpanded = expandedIds.includes(item.id);

  // 토글 기능 상태
  const { isFeatureActive, handleToggle } = useToggleFeatureStore(item.feature);

  return (
    <>
      <div
        className={`accordion-item  ${isExpanded ? 'max-h-160' : 'max-h-12'} `}
      >
        {/* 제목 및 토글 버튼 */}
        <div
          className="flex rounded-2xl justify-between max-h-12 items-center p-6 cursor-pointer"
          onClick={() => toggleExpand(item.id)}
          role="button"
          aria-expanded={expandedIds.includes(item.id)} // 확장 상태 명시
          aria-controls={`accordion-content-${item.id}`}
        >
          <div className="font-semibold">{item.title}</div>
          <div className="flex items-center gap-4">
            {item.hasToggle && (
              <Toggle state={isFeatureActive} setState={handleToggle} />
            )}
            <i
              className={`bx bx-chevron-down text-xl transition-all duration-300 ${
                expandedIds.includes(item.id) ? 'rotate-180' : ''
              }`}
            ></i>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div
          id={`accordion-content-${item.id}`} // 제목이랑 연결
          className={`px-5 pb-5 overflow-hidden transition-all duration-300 ease-in-out ${
            expandedIds.includes(item.id) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div>{item.content}</div>
        </div>
      </div>
    </>
  );
};
