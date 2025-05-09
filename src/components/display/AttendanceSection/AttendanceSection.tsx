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

  const dateText = `날짜: ${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일  ${weddingTime.hour}시 ${weddingTime.minute === 0 ? '' : weddingTime.minute + '분'}  `;
  const { rsvpTitle, rsvpDescription } = useRSVPStore();
  const defaultScript: {
    title: string;
    description: React.ReactNode;
  } = {
    title: '참석 의사 전달',
    description: (
      <>
        {/* 서로에게 행복을 주는 사람을 만났습니다
        <br />
        운명처럼 만나게 된 우리의 인연 그 인연에 이끌려 이제 영원을 함께
        약속하려 합니다
        <br />
        저희의 하나 됨을 지켜보아 주시고 격려해 주시면 더없는 기쁨으로
        간직하겠습니다 */}
        축하해 주시는 한 분 한 분을 <br />
        소중히 모실 수 있도록 <br />
        참석 의사를 사전에 전달해 주시길 부탁드립니다
      </>
    ),
  };

  return (
    <>
      <div className={`column-center py-20`}>
        <SectionTitle
          subTitle="RSVP"
          title={rsvpTitle === '' ? defaultScript.title : rsvpTitle}
          information={
            <p className="text-center text-base leading-loose whitespace-normal px-10">
              {rsvpDescription === ''
                ? defaultScript.description
                : rsvpDescription}
            </p>
          }
        />

        <div className="column-center py-10 bg-rose-50/70 rounded-xl w-full">
          <div className="flex flex-col gap-4 mb-10 mx-12">
            <div className="flex flex-row gap-2">
              <HeartIcon /> {`${brideGroom[0].name || '김세모'} & ${brideGroom[1].name || '이네모'}`}
            </div>
            <div className="flex flex-row gap-2">
              <CalendarIcon />
              {dateText}
            </div>
            <div className="flex flex-row gap-2 ">
              <PinIcon />
              <div>{'장소: '}</div>
              <div className="whitespace-pre-wrap">
                {address && <div className="mb-1">{address.split('(')[0]}</div>}
                {(weddingHallName || weddingHallDetail) && (
                  <div className="text-gray-500">
                    {`${weddingHallName || '미정'}, ${weddingHallDetail || " 미정"}`}
                  </div>
                )}
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
      </div>
      {modal && <RsvpModal setModal={setModal} />}
    </>
  );
}
