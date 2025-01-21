import { useCalendarFeatureStore } from "../../../../store/OptionalFeature/useCalendarFeatureStore";


const CalendarFeature = () => {
  const { subFeatures, toggleSubFeature } = useCalendarFeatureStore();

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

      {/* 서브 기능 - 캘린더, 카운트다운, 디데이 */}
      <div className="flex-center gap-3 text-gray-400 p-4 text-xs ">
        <button
          className={`select-btn ${subFeatures.calendar ? 'text-black bg-button bg-opacity-20 shadow-md' : ''}`}
          onClick={() => toggleSubFeature('calendar', !subFeatures.calendar)}
        >
          캘린더
        </button>
        <button
          className={`select-btn ${subFeatures.countdown ? 'text-black bg-button bg-opacity-20 shadow-md' : ''}`}
          onClick={() => toggleSubFeature('countdown', !subFeatures.countdown)}
        >
          카운트다운
        </button>
        <button
          className={`select-btn ${subFeatures.dday ? 'text-black bg-button bg-opacity-20 shadow-md' : ''}`}
          onClick={() => toggleSubFeature('dday', !subFeatures.dday)}
        >
          디데이
        </button>
      </div>
    </div>
  );
};

export default CalendarFeature;
