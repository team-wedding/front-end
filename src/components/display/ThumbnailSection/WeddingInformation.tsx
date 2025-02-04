import { useWeddingStore } from '@store/useWeddingStore';
import useAddressStore from '@store/useAddressStore';

const WeddingInformation = () => {
  const { formattedDate, weddingDate, weddingTime } = useWeddingStore();
  const { weddingHallName, weddingHallDetail } = useAddressStore();

  const currentDate = weddingDate || new Date();
  const dayOfWeeks = ['월', '화', '수', '목', '금', '토', '일'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  const date = `${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일 ${dayOfWeek}요일, ${weddingTime.hour}시 ${weddingTime.minute! < 9 ? '0' : ''}${weddingTime.minute!}분 `;

  const hallName = weddingHallName || '우리결혼하장';
  const hallDetail = weddingHallDetail || '2층 사랑홀';

  return (
    <div className="column-center text-sm font-light gap-2">
      <div>{date}</div>
      <div className="flex opacity-60">
        <div className="px-1">{hallName}</div>
        <div>{hallDetail}</div>
      </div>
    </div>
  );
};

export default WeddingInformation;
