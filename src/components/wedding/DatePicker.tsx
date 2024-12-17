import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { useWeddingStore } from '../../store/store';

const DatePicker: React.FC = () => {
  const { weddingDate, setWeddingDate } = useWeddingStore();

  registerLocale('ko', ko);

  return (
    <div className="flex justify-center items-center gap-5">
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full"
      />
      {!weddingDate && (
        <div className="mt-2 text-sm text-red-400">날짜를 선택해주세요</div>
      )}
    </div>
  );
};

export default DatePicker;
