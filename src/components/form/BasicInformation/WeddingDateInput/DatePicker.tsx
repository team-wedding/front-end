import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { useWeddingStore } from '@store/useWeddingStore';

const DatePicker: React.FC = () => {
  const { weddingDate, setWeddingDate } = useWeddingStore();

  registerLocale('ko', ko);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="datepicker" className="label">
        예식 일
      </label>
      <ReactDatePicker
        id="datepicker"
        selected={weddingDate}
        onChange={setWeddingDate}
        showIcon
        toggleCalendarOnIconClick
        locale="ko"
        dateFormat="yyyy년 MM월 dd일"
        isClearable
        todayButton="오늘"
        className="formInput w-full"
        // className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus-visible:ring-0 focus:ring-primary focus:border-primary flex-1"
      />
    </div>
  );
};

export default DatePicker;
