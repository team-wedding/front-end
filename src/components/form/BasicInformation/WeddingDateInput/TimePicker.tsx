import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko';
import { useWeddingStore } from '../../../../store/useWeddingStore';

const TimePicker = () => {
  const { weddingTime, setWeddingTime } = useWeddingStore();
  // const time = new Date(`2023-01-01T${weddingTime}`);

  const minTime = new Date();
  const maxTime = new Date();
  minTime.setHours(8, 59);
  maxTime.setHours(23, 59);

  registerLocale('ko', ko);

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      setWeddingTime(time.getHours(), time.getMinutes());
    }
  };
  const selectedTime =
    weddingTime.hour !== null && weddingTime.minute !== null
      ? new Date(
          `2023-01-01T${weddingTime.hour.toString().padStart(2, '0')}:${weddingTime.minute.toString().padStart(2, '0')}:00`,
        )
      : null;

  // const selectedTime = weddingTime.hour !== null && weddingTime.minute !== null ? new Date()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="timepicker" className="label">
        예식 시간
      </label>
      <ReactDatePicker
        id="timepicker"
        selected={selectedTime}
        onChange={handleTimeChange}
        shouldCloseOnSelect
        placeholderText="시간을 선택하세요"
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="시간"
        dateFormat="HH:mm"
        locale={ko}
        minTime={minTime}
        maxTime={maxTime}
        className="formInput w-full"
        //  className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus-visible:ring-0 focus:ring-primary focus:border-primary <flex-1></flex-1> !important"
      />
      {!weddingTime && (
        <div className="mt-2 text-sm text-red-600">시간을 선택해주세요</div>
      )}
    </div>
  );
};

export default TimePicker;
