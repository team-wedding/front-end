import { useOptionalFeatureStore } from '@store/OptionalFeature/useOptionalFeatureStore';
import { useCalendarFeatureStore } from '@store/OptionalFeature/useCalendarFeatureStore';
import { useWeddingStore } from '@store/useWeddingStore';
import Calendar from './Calendar';
import CalendarTitle from './CalendarTitle';
import CountDown from './CountDown';
import DDay from './DDay';

const CalendarSection = () => {
  const { weddingDate, weddingTime } = useWeddingStore();
  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const { subFeatures } = useCalendarFeatureStore();

  const isCalenderFeatureActive = selectedOptionalFeatures.calendar;
  const renderSubFeatures = [
    subFeatures.calendar && <Calendar key="calendar" />,
    subFeatures.countdown && (
      <CountDown
        key="countdown"
        targetDate={weddingDate}
        targetTime={weddingTime}
      />
    ),
    subFeatures.dday && <DDay key="dday" />,
  ].filter(Boolean);

  return (
    isCalenderFeatureActive && (
      <div className="column-center gap-6">
        <div className="text-3xl font-thin tracking-widest">WEDDING DAY</div>
        <CalendarTitle />
        <div className="column-center gap-10">
          {/* 캘린더 기능이 활성화 될때만 렌더링 */}
          {renderSubFeatures}
        </div>
      </div>
    )
  );
};

export default CalendarSection;
