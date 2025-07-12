import { useWeddingStore } from '@store/useWeddingStore';
import useAddressStore from '@store/useAddressStore';

const WeddingInformation = () => {
  const { formattedDate, weddingDate, weddingTime } = useWeddingStore();
  const { weddingHallName, weddingHallDetail } = useAddressStore();

  const currentDate =
    weddingDate instanceof Date && !isNaN(weddingDate.getTime())
      ? weddingDate
      : new Date();

  const dayOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  const year = formattedDate.year ?? currentDate.getFullYear();
  const month = formattedDate.month ?? currentDate.getMonth() + 1;
  const day = formattedDate.day ?? currentDate.getDate();

  const hour = weddingTime.hour ?? 12;
  const minute = weddingTime.minute ?? 0;

  const formattedMinute =
    minute === 0 || minute === null
      ? ''
      : `${minute.toString().padStart(2, '0')}분`;

  const date = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일 ${hour}시${formattedMinute ? ' ' + formattedMinute : ''}`;

  const hallName = weddingHallName || '우리결혼하장';
  const hallDetail = weddingHallDetail || '2층 사랑홀';

  return (
    <div className="column-center gap-4 w-full">
      {date}
      <span className="text-sm text-gray-500">
        {hallName} {hallDetail}
      </span>
    </div>
  );
};

export default WeddingInformation;
