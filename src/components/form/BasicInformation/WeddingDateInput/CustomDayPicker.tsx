import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { useWeddingStore } from '@store/useWeddingStore';

const CustomDayPicker = () => {
  const { weddingDate, setWeddingDate } = useWeddingStore();

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setWeddingDate(date);
  };

  return (
    <>
      <DayPicker
        animate
        locale={ko}
        captionLayout="dropdown"
        hideNavigation
        navLayout="after"
        mode="single"
        startMonth={new Date(2025, 0)}
        endMonth={new Date(2040, 11)}
        selected={weddingDate}
        onSelect={handleDateChange}
        classNames={{
          dropdown: `rounded-lg border-none focus:ring-0 bg-transparent flex flex-row-reverse text-slate-900/80 font-semibold`,
          months: 'wedding-datepicker-months',
          month: 'wedding-datepicker-month',
          caption: 'wedding-datepicker-caption',
          selected: `wedding-datepicker-day-selected`,
          caption_label: `hidden`,
          day: 'wedding-datepicker-day',
        }}
      />
    </>
  );
};

export default CustomDayPicker;
