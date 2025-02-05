import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useWeddingStore } from '@store/useWeddingStore';

const Calendar = () => {
  const { weddingDate } = useWeddingStore();
  const currentDate = weddingDate || new Date();

  const dayOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDay = startOfWeek(firstDayOfMonth); // 첫 주 일요일
  const endDay = endOfWeek(lastDayOfMonth); // 마지막 주 토요일
  const allDays = eachDayOfInterval({ start: startDay, end: endDay });

  return (
    <div className="flex flex-col items-center justify-center text-sm gap-6">
      <div className="border-b opacity-80 w-full"></div>
      <div>
        <div className="grid grid-cols-7 p-2 gap-4 text-center font-light">
          {dayOfWeeks.map((day) => (
            <div key={day} className={`${day === '일' && 'text-rose-400'}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-light">
          {allDays.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelectedDay = isSameDay(day, weddingDate || new Date());
            return (
              <div
                key={index}
                className={`p-[10px] ${isSelectedDay && 'bg-rose-300 text-white rounded-full'}  ${index % 7 === 0 && 'text-rose-500'} ${isCurrentMonth ? 'text-gray-900' : 'text-opacity-0 text-transparent'}`}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-b opacity-80 w-full"></div>
    </div>
  );
};

export default Calendar;
