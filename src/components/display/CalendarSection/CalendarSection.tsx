import DDay from './DDay';
import { useWeddingStore } from '../../../store/useWeddingStore';
import Calendar from './Calendar';
import CalendarTitle from './CalendarTitle';

const CalendarSection = () => {
  const { weddingDate, weddingTime } = useWeddingStore();

  return (
    <div className="column-center gap-10">
      <CalendarTitle />
      <Calendar />
      <DDay targetDate={weddingDate} targetTime={weddingTime} />
    </div>
  );
};

export default CalendarSection;
