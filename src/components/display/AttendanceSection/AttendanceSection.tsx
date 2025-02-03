import { useState } from 'react';
import RsvpModal from '../RsvpSection/RsvpModal';

export default function AttendanceSection() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className={`flex flex-col items-center gap-3  `}>
        <div className=" text-highlight">참석 의사 전달</div>
        <p className="mt-2 text-center text-sm leading-6">
          축하하는 마음으로 참석해주시는
          <br /> 모든 분들을 귀하게 모실 수 있도록
          <br /> 참석의사를 전달 부탁드립니다
        </p>
        <button
          className=" py-2 bg-button text-white hover:bg-button/80 rounded-full px-8"
          onClick={() => setModal(true)}
        >
          참석 의사 전달하기
        </button>
      </div>
      {modal && (
        <RsvpModal
          setModal={setModal}
        />
      )}
    </>
  );
}
