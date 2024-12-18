import React from 'react';
import DDay from './DDay';
import { useWeddingStore } from '../../../store/useWeddingStore';
import Calendar from './Calendar';
import CalendarTitle from './CalendarTitle';

const CalendarSection = () => {
  const { weddingDate, weddingTime } = useWeddingStore();

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <CalendarTitle />
      <Calendar />
      <DDay targetDate={weddingDate} targetTime={weddingTime} />
    </div>
  );
};

export default CalendarSection;
