import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import { useCalendarFeatureStore } from '@store/OptionalFeature/useCalendarFeatureStore';

const CalendarFeature = () => {
  const { subCalendarFeatures, toggleSubFeature } = useCalendarFeatureStore();

  return (
    <div className="text-xs mx-4">
      <InformationItem
        messages={['예식 날짜를 나타내고 싶은 기능을 선택해주세요.']}
      />

      <hr />

      {/* 서브 기능 - 캘린더, 카운트다운, 디데이 */}
      <div className="flex-center gap-2 text-gray-400 text-[10px] my-6">
        <button
          className={`select-btn ${subCalendarFeatures.calendar ? 'active-btn' : ''}`}
          onClick={() =>
            toggleSubFeature('calendar', !subCalendarFeatures.calendar)
          }
        >
          캘린더
        </button>
        <button
          className={`select-btn ${subCalendarFeatures.countdown ? 'active-btn' : ''}`}
          onClick={() =>
            toggleSubFeature('countdown', !subCalendarFeatures.countdown)
          }
        >
          카운트다운
        </button>
        <button
          className={`select-btn ${subCalendarFeatures.dday ? 'active-btn' : ''}`}
          onClick={() => toggleSubFeature('dday', !subCalendarFeatures.dday)}
        >
          디데이
        </button>
      </div>
    </div>
  );
};

export default CalendarFeature;
