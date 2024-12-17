import React from 'react';
import Calendar from './Calendar';
import DDay from './DDay';
import { useWeddingStore } from '../../store/store';

const CalendarSection = () => {
  const { weddingDate, weddingTime } = useWeddingStore();

  const currentDate = weddingDate || new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const dayOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  return (
    <div className="flex flex-col justify-center items-center gap-10 max-w-72">
      <div className="flex flex-col items-center justify-center gap-2 tracking-widest">
        {weddingDate && (
          <div className="text-xl">{`${year}.${month}.${day}`}</div>
        )}
        {weddingTime && (
          <div className="text-sm">{`${dayOfWeek}요일 ${weddingTime}`}</div>
        )}
      </div>
      <Calendar />
      <DDay targetDate={weddingDate} targetTime={weddingTime} />
    </div>
  );
};

export default CalendarSection;
