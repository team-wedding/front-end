import { useState } from 'react';
import RsvpModal from './RsvpModal';
import SectionTitle from '@/components/common/SectionTitle';

export default function AttendanceSection() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className={`column-center gap-4 py-20 w-full`}>
        <SectionTitle subTitle="RSVP" title="참석 의사 전달" />
        <p className="text-center leading-loose my-5">
          축하하는 마음으로 참석해주시는
          <br /> 모든 분들을 귀하게 모실 수 있도록
          <br /> 참석의사를 전달 부탁드립니다
        </p>
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
