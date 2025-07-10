import CustomDayPicker from '@/components/form/BasicInformation/WeddingDateInput/CustomDayPicker';
import CustomTimePicker from '@/components/form/BasicInformation/WeddingDateInput/CustomTimePicker';
import { useCompletionTracker } from '@/hooks/useCompletionTracker';
import { useWeddingStore } from '@/store/useWeddingStore';

const WeddingDateInput = () => {
  const { weddingDate, weddingTime, formattedDate } = useWeddingStore();

  const selectedDate =
    formattedDate.year && formattedDate.month && formattedDate.day
      ? `${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일`
      : '';

  const selectedTime =
    weddingTime.hour !== null
      ? weddingTime.minute === 0 || weddingTime.minute === null
        ? `${weddingTime.hour}시`
        : `${weddingTime.hour}시 ${weddingTime.minute}분`
      : '';

  const isDateValid =
    weddingDate instanceof Date && !isNaN(weddingDate.getTime());
  const isTimeValid =
    typeof weddingTime.hour === 'number' &&
    typeof weddingTime.minute === 'number';
  const dateFilled = isDateValid && isTimeValid;

  useCompletionTracker({
    feature: 'weddingDateInput',
    isCompleted: dateFilled,
    deps: [weddingDate, weddingTime],
  });

  return (
    <>
      <section className="py-3">
        <label htmlFor="datepicker" className="label">
          예식 일시 *
        </label>
        <div className="py-3 space-y-4 max-w-80 mx-auto">
          <CustomDayPicker />
          <CustomTimePicker />

          <p className="text-center pt-4 mx-auto text-gray-900 rounded flex-center gap-2">
            <span>{selectedDate}</span>
            <span>{selectedTime}</span>
          </p>
        </div>
      </section>
    </>
  );
};

export default WeddingDateInput;
