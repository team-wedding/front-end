import { useWeddingStore } from '@store/useWeddingStore';

const DateTitle = () => {
  const { formattedDate, weddingDate } = useWeddingStore();

  const currentDate = weddingDate || new Date();
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
    <div className="column-center gap-1 tracking-wide font-Crimson font-light">
      <div className="text-3xl">{`${formattedDate.year} / ${formattedDate.month} / ${formattedDate.day}`}</div>
      <div>{dayOfWeek.toUpperCase()}</div>
    </div>
  );
};

export default DateTitle;
