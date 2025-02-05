import { useWeddingStore } from '@store/useWeddingStore';
import useAddressStore from '@store/useAddressStore';

const WeddingInformation = () => {
  const { formattedDate, weddingDate, weddingTime } = useWeddingStore();
  const { weddingHallName, weddingHallDetail } = useAddressStore();

  const currentDate = weddingDate || new Date();
  const dayOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  const date = `${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일 ${dayOfWeek}요일, ${weddingTime.hour}시 ${weddingTime.minute! < 9 ? '0' : ''}${weddingTime.minute!}분 `;

  const hallName = weddingHallName || '우리결혼하장';
  const hallDetail = weddingHallDetail || '2층 사랑홀';

  return (
    <div className="column-center gap-4 tracking-normal">
      <div>{date}</div>
      <div className="flex text-sm opacity-50 gap-1">
        <div>{hallName}</div>
        <div>{hallDetail}</div>
      </div>
    </div>
  );
};

export default WeddingInformation;
