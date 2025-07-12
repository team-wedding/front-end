import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import { useCalendarFeatureStore } from '@store/OptionalFeature/useCalendarFeatureStore';

const CalendarFeature = () => {
  const { subCalendarFeatures, toggleSubFeature } = useCalendarFeatureStore();

  return (
    <>
      <InformationItem
        messages={['예식 날짜를 나타내고 싶은 기능을 선택해주세요.']}
      />

      {/* 서브 기능 - 캘린더, 카운트다운, 디데이 */}
      <div className="flex-center gap-2 text-slate-500 text-sm py-6">
        <button
          className={`px-4 py-3 ${subCalendarFeatures.calendar ? 'glass-button-selected' : 'glass-button'}`}
          onClick={() =>
            toggleSubFeature('calendar', !subCalendarFeatures.calendar)
          }
        >
          캘린더
        </button>
        <button
          className={`px-4 py-3 ${subCalendarFeatures.countdown ? 'glass-button-selected' : 'glass-button'}`}
          onClick={() =>
            toggleSubFeature('countdown', !subCalendarFeatures.countdown)
          }
        >
          카운트다운
        </button>
        <button
          className={`px-4 py-3 ${subCalendarFeatures.dday ? 'glass-button-selected' : 'glass-button'}`}
          onClick={() => toggleSubFeature('dday', !subCalendarFeatures.dday)}
        >
          디데이
        </button>
      </div>
    </>
  );
};

export default CalendarFeature;
