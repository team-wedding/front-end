import { useCalendarStore } from '../../../store/useCalendarStore';

const CalendarSelection = () => {
  const features = ['calendar', 'dday', 'countdown'];

  const { selectedFeatures, selectFeature } = useCalendarStore();

  const handleSelect = (feature: string) => {
    selectFeature(feature);
  };

  return (
    <div>
      {/* 안내문 추가 */}
      <div className="max-w-sm mx-auto p-4 pb-2 text-[10px] text-gray-400">
        <div className="flex items-start gap-1 mb-2">
          <span className="text-gray-600">ⓘ</span>
          <span>날짜를 나타내고 싶은 기능을 선택해주세요.</span>
        </div>
      </div>
      <hr className="border-gray-200" />

      <div className="flex-center gap-3 text-gray-400 p-4 text-xs ">
        {features.map((feature) => (
          <button
            key={feature}
            className={`select-btn ${selectedFeatures.includes(feature) ? 'text-black bg-button bg-opacity-20 shadow-md' : ''}`}
            onClick={() => handleSelect(feature)}
          >
            {feature === 'calendar'
              ? '캘린더'
              : feature === 'dday'
                ? '디데이'
                : '카운트다운'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarSelection;
