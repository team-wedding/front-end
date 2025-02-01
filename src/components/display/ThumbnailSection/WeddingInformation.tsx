import { useWeddingStore } from '@store/useWeddingStore';
import useAddressStore from '@store/useAddressStore';

const WeddingInformation = () => {
  const { formattedDate, weddingDate, weddingTime } = useWeddingStore();
  const { weddingHallName, weddingHallDetail } = useAddressStore();

  const currentDate = weddingDate || new Date();
  const dayOfWeeks = ['월', '화', '수', '목', '금', '토', '일'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  const date = `${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일 ${dayOfWeek}요일, ${weddingTime.hour}시 ${weddingTime.minute! < 9 ? '0' : ''}${weddingTime.minute!}분 `;

  return (
    <div className="column-center text-sm font-light gap-2">
      <div>{date}</div>
      <div className="flex opacity-60">
        <div className="px-1">{weddingHallName}</div>
        <div>{weddingHallDetail}</div>
      </div>
    </div>
  );
};

export default WeddingInformation;
