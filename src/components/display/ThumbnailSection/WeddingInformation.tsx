import { useWeddingStore } from '@store/useWeddingStore';
import useAddressStore from '@store/useAddressStore';

const WeddingInformation = () => {
  const { formattedDate, weddingDate, weddingTime } = useWeddingStore();
  const { jibunAddress } = useAddressStore();

  const currentDate = weddingDate || new Date();
  const dayOfWeeks = ['월', '화', '수', '목', '금', '토', '일'];
  const dayOfWeek = dayOfWeeks[currentDate.getDay()];

  const date = `${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일 ${dayOfWeek}요일, ${weddingTime}`;

  return (
    <div className="column-center text-sm font-light gap-2">
      <div>{date}</div>
      <div className="opacity-60">
        {jibunAddress || '서울 강남구 언주로 564'}
      </div>
    </div>
  );
};

export default WeddingInformation;
