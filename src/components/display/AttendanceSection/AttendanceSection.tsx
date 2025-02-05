import { useState } from 'react';
import RsvpModal from './RsvpModal';
import SectionTitle from '@/components/common/SectionTitle';
import { useWeddingStore } from '@/store/useWeddingStore';
import useAddressStore from '@/store/useAddressStore';
import useBrideGroomStore from '@/store/useBrideGroomStore';
import useRSVPStore from '@/store/useRSVPStore';
import HeartIcon from '@icons/HeartIcon';
import CalendarIcon from '@icons/CalendarIcon';
import PinIcon from '@icons/PinIcon';
export default function AttendanceSection() {
  const [modal, setModal] = useState(false);
  const { weddingTime, formattedDate } = useWeddingStore();
  const { address, weddingHallName, weddingHallDetail } = useAddressStore();
  const { brideGroom } = useBrideGroomStore();

  const dateText = `날짜: ${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일  ${weddingTime.hour}시 ${weddingTime.minute}분  `;
  const { rsvpTitle, rsvpDescription } = useRSVPStore();
  const defaultScript: { title: string; description: string } = {
    title: '참석의사전달',
    description:
      ' 서로에게 행복을 주는 사람을 만났습니다. 웃는 모습이 너무나 예쁜 그사람을 만났습니다.배려하는 마음이 따뜻한 그 사람을 만났습니다. 운명처럼 만나게 된 우리의 인연 그 인연에 이끌려 이제 영원을 함께 약속하려 합니다.저희의 하나 됨을 지켜보아 주시고 격려해 주시면 더없는 기쁨으로 간직하겠습니다.',
  };
  return (
    <>
      <div className={`column-center gap-4 py-20 w-full`}>
        <SectionTitle subTitle="RSVP" title="참석 의사 전달" />
        <div className="flex flex-col items-center gap-12 ">
          <div className="text-2xl font-semibold">
            {rsvpTitle === '' ? defaultScript.title : rsvpTitle}
          </div>
          <p className="text-center text-base leading-loose break-words whitespace-normal ">
            {rsvpDescription === ''
              ? defaultScript.description
              : rsvpDescription}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
              <HeartIcon /> {`${brideGroom[0].name} & ${brideGroom[1].name}`}
            </div>
            <div className="flex flex-row gap-2 text-base items-center">
              <CalendarIcon />
              {dateText}
            </div>
            <div className="flex flex-row gap-2 text-base items-start h-fit">
              <PinIcon />
              <div className="self-start leading-6">{'장소: '}</div>
              <div className="w-64 break-words whitespace-normal">
                <div className="w-full">{address + ','}</div>
                <div className="w-full">{weddingHallName + ','}</div>
                <div className="w-full">{weddingHallDetail}</div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="py-2 bg-button text-white hover:bg-button/80 rounded-full px-8"
          onClick={() => setModal(true)}
        >
          참석 의사 전달하기
        </button>
      </div>
      {modal && <RsvpModal setModal={setModal} />}
    </>
  );
}
