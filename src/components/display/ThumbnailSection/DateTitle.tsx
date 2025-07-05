import { useWeddingStore } from '@store/useWeddingStore';

const DateTitle = () => {
  const { weddingDate } = useWeddingStore();

  const currentDate =
    weddingDate instanceof Date && !isNaN(weddingDate.getTime())
      ? weddingDate
      : new Date();

  const dayOfWeeks = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  return (
    //remove font-Crimson
    <div className="column-center gap-1 tracking-wide  font-light">
      <div className="text-3xl">
        {`${currentDate.getFullYear()} / ${
          currentDate.getMonth() + 1
        } / ${currentDate.getDate()}`}
      </div>
      <div>{dayOfWeek.toUpperCase()}</div>
    </div>
  );
};

export default DateTitle;
