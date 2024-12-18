import React from 'react';
import { useWeddingStore } from '../../../store/useWeddingStore';

const CalendarTitle = () => {
  const { weddingDate, weddingTime } = useWeddingStore();

  const currentDate = weddingDate || new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const dayOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  return (
    <div className="flex flex-col items-center justify-center gap-3 tracking-widest">
      {weddingDate && (
        <div className="text-xl">{`${year}.${month}.${day}`}</div>
      )}
      {weddingTime && (
        <div className="text-sm text-gray-500">{`${dayOfWeek}요일 ${weddingTime}`}</div>
      )}
    </div>
  );
};

export default CalendarTitle;
