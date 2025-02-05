import { useWeddingStore } from '@store/useWeddingStore';

const CalendarTitle = () => {
  const { formattedDate, weddingDate, weddingTime } = useWeddingStore();
  const { hour, minute } = weddingTime;

  const currentDate = weddingDate || new Date();
  const dayOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  const weddingD = `${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일 ${dayOfWeek}요일`;
  const weddingT = `${hour}시 ${minute === 0 ? '' : `${minute}분`}`;

  return (
    <div className="flex-center gap-2 tracking-widest text-sm font-thin">
      {weddingDate && <div>{weddingD}</div>}
      {weddingTime && <div>{weddingT}</div>}
    </div>
  );
};

export default CalendarTitle;
