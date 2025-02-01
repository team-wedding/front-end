import { useState } from 'react';
import Toggle from '@common/Toggle';
import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import OnOff from '@/components/common/OnOff';

export interface RSVPDetails {
  title: string;
  desc: string;
}

const RsvpExample = () => {
  const [rsvpDetail, setRsvpDetail] = useState<RSVPDetails>({
    title: '',
    desc: '',
  });
  const [meal, setMeal] = useState(false);
  const [population, setPopulation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRsvpDetail({
      ...rsvpDetail,
      [name]: value,
    });
  };

  return (
    <div className="mx-4 my-6 text-xs">
      <InformationItem
        messages={[
          '결혼식 당일의 구체적인 계획에 도움을 받을 수 있습니다.',
          '제출된 답변은 마이페이지에서 확인할 수 있습니다.',
        ]}
      />

      <hr />

      <div className="flex flex-col gap-5 my-10">
        <div className="flex flex-col gap-2">
          <label className="label w-full">제목</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="제목을 입력해주세요"
            className="formInput w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label w-full">내용</label>
          <textarea
            onChange={handleChange}
            placeholder="내용을 입력해주세요"
            className="formInput w-full"
          />
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-3 my-10">
        <div className="flex justify-between items-center border rounded-2xl px-6 py-2">
          식사여부
          <OnOff state={meal} setState={setMeal} />
          {/* <Toggle state={meal} setState={setMeal} /> */}
        </div>
        <div className="flex justify-between items-center border rounded-2xl px-6 py-2">
          참석 인원
          <OnOff state={population} setState={setPopulation} />
          {/* <Toggle state={population} setState={setPopulation} /> */}
        </div>
      </div>
    </div>
  );
};

export default RsvpExample;
