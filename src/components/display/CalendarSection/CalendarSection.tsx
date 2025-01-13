import { useWeddingStore } from '../../../store/useWeddingStore';
import Calendar from './Calendar';
import CalendarTitle from './CalendarTitle';
import CountDown from './CountDown';
import DDay from './DDay';
import { useCalendarStore } from '../../../store/useCalendarStore';

const CalendarSection = () => {
  const { weddingDate, weddingTime } = useWeddingStore();
  const selectedFeatures = useCalendarStore((state) => state.selectedFeatures);

  const renderFeatures = () => {
    return selectedFeatures.map((feature) => {
      switch (feature) {
        case 'calendar':
          return (
            <>
              <CalendarTitle key={'calendar'} />
              <Calendar key={'calendar'} />
            </>
          );
        case 'dday':
          return <DDay key="dday" />;
        case 'countdown':
          return (
            <CountDown
              key="countdown"
              targetDate={weddingDate}
              targetTime={weddingTime}
            />
          );
      }
    });
  };

  return <div className="column-center gap-10">{renderFeatures()}</div>;
};

export default CalendarSection;
