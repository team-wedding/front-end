import React from 'react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const WeddingDateInput: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <DatePicker />
      <TimePicker />
    </div>
  );
};

export default WeddingDateInput;
