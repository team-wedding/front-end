import React from 'react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const WeddingDateInput: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex flex-col gap-3">
        <DatePicker />
        <TimePicker />
      </div>
    </div>
  );
};

export default WeddingDateInput;