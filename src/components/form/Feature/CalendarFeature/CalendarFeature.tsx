import { useCalendarFeatureStore } from '@store/OptionalFeature/useCalendarFeatureStore';

const CalendarFeature = () => {
  const { subFeatures, toggleSubFeature } = useCalendarFeatureStore();

  return (
    <div className="text-xs mx-4 mt-4">
      {/* 안내문 추가 */}
      <div className="max-w-sm mx-auto text-[9px] text-gray-400 opacity-80 mb-4">
        <div className="flex items-start gap-1">
          <span className="text-gray-400">ⓘ</span>
          <span>예식 날짜를 나타내고 싶은 기능을 선택해주세요.</span>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* 서브 기능 - 캘린더, 카운트다운, 디데이 */}
      <div className="flex-center gap-2 text-gray-400 text-[10px] my-6">
        <button
          className={`select-btn ${subFeatures.calendar ? 'active-btn' : ''}`}
          onClick={() => toggleSubFeature('calendar', !subFeatures.calendar)}
        >
          캘린더
        </button>
        <button
          className={`select-btn ${subFeatures.countdown ? 'active-btn' : ''}`}
          onClick={() => toggleSubFeature('countdown', !subFeatures.countdown)}
        >
          카운트다운
        </button>
        <button
          className={`select-btn ${subFeatures.dday ? 'active-btn' : ''}`}
          onClick={() => toggleSubFeature('dday', !subFeatures.dday)}
        >
          디데이
        </button>
      </div>
    </div>
  );
};

export default CalendarFeature;
