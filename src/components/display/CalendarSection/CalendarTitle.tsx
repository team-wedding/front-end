import React from 'react';
import { useWeddingStore } from '../../../store/useWeddingStore';

const CalendarTitle = () => {
  const { formattedDate, weddingDate, weddingTime } = useWeddingStore();

  const currentDate = weddingDate || new Date();
  const dayOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  return (
    <div className="flex flex-col items-center justify-center gap-2 tracking-wider font-light">
      {weddingDate && (
        <div className="text-xl">{`${formattedDate.year}. ${formattedDate.month}. ${formattedDate.day}`}</div>
      )}
      {weddingTime && (
        <div className="text-sm text-gray-500">{`${dayOfWeek}요일 ${weddingTime}`}</div>
      )}
    </div>
  );
};

export default CalendarTitle;
