import { calculateDday } from '../../../utils/dateUtils';
import { useWeddingStore } from '../../../store/useWeddingStore';

const DDay = () => {
  const { weddingDate, weddingTime } = useWeddingStore();

  const dDayResult = calculateDday(weddingDate, weddingTime);

  if (!dDayResult) {
    return;
  }

  const { days } = dDayResult;
  const text = `결혼식이 ${days > 0 ? `${days}일 남았습니다` : `오늘입니다`}`;

  return (
    <div className="text-[10px] text-gray-500 tracking-widest">{text}</div>
  );
};

export default DDay;
