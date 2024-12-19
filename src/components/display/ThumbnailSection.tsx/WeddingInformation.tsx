import React from 'react';
import { useWeddingStore } from '../../../store/useWeddingStore';

const WeddingInformation = () => {
  const { formattedDate, weddingDate, weddingTime } = useWeddingStore();

  const currentDate = weddingDate || new Date();
  const dayOfWeeks = ['월', '화', '수', '목', '금', '토', '일'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  const date = `${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일 ${dayOfWeek}요일, ${weddingTime}`;

  const address = ``;

  return (
    <div>
      <div className="text-sm font-light">{date}</div>
      <div>{address}</div>
    </div>
  );
};

export default WeddingInformation;
