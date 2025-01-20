import { Dispatch, SetStateAction, useState } from 'react';
import CloseIcon from '../../icons/CloseIcon';
import HeartIcon from '../../icons/HeartIcon';
import CalendarIcon from '../../icons/CalendarIcon';
import PinIcon from '../../icons/PinIcon';

interface ModalProp {
  bride: string;
  groom: string;
  date: string;
  time: string;
  modal: boolean;
  location: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}
interface InfoDetail {
  brideMember: boolean;
  name: string;
  member: number;
  dine: '예정' | '안함' | '미정';
}

const RsvpModal: React.FC<ModalProp> = ({
  bride,
  groom,
  date,
  time,
  location,
  modal,
  setModal,
}) => {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState<InfoDetail>({
    brideMember: false,
    name: '',
    member: 0,
    dine: '예정',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  //TODO : 동적으로 색 바꿀수있게 props로 받아서 차리
  //TODO : 재사용할수있는 코드 리팩토링 특히 인풋

  return (
    <div
      className={`relative flex flex-col px-10 pt-10 bg-white pb-10 w-[370px] rounded-xl  border ${modal ? 'visible' : 'hidden'}`}
    >
      <button
        className="absolute top-5 right-8"
        onClick={() => setModal(false)}
      >
        <CloseIcon className="size-[26px] text-gray-800 dark:text-white" />
      </button>
      {step == 0 ? (
        <div className="flex flex-col items-center gap-12">
          <div className="text-2xl font-semibold">참석 의사 전달</div>
          <div className="text-center text-base">
            서로에게 행복을 주는 사람을 만났습니다. 웃는 모습이 너무나 예쁜 그
            사람을 만났습니다. 배려하는 마음이 따뜻한 그 사람을 만났습니다.
            운명처럼 만나게 된 우리의 인연 그 인연에 이끌려 이제 영원을 함께
            약속하려 합니다. 저희의 하나 됨을 지켜보아 주시고 격려해 주시면
            더없는 기쁨으로 간직하겠습니다.
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
              <HeartIcon /> {`${groom} & ${bride}`}
            </div>
            <div className="flex flex-row gap-2 text-sm items-center">
              <CalendarIcon />
              {`날짜: ${date} ${time}`}
            </div>
            <div className="flex flex-row gap-2 items-center">
              <PinIcon />
              {`장소: ${location}`}
            </div>
          </div>
          <button
            className="bg-primary rounded-md py-2 w-full text-white"
            onClick={() => setStep(1)}
          >
            참석의사 전달하기
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <div className="text-2xl font-semibold">참석 의사 전달</div>
          <div className="flex flex-row w-full gap-10 items-center justify-between">
            구분 :
            <div className="flex gap-1 w-48 justify-between">
              <button
                className={`rounded-md px-2 py-2 w-1/2  ${info.brideMember ? 'text-gray-700 bg-gray-200 ' : 'text-white  bg-primary'} `}
                onClick={() =>
                  setInfo((prev) => ({ ...prev, brideMember: false }))
                }
              >
                신랑측
              </button>
              <button
                className={`rounded-md px-2 py-2 w-1/2 ${info.brideMember ? 'text-white bg-primary' : 'text-gray-700 bg-gray-200'} `}
                onClick={() =>
                  setInfo((prev) => ({ ...prev, brideMember: true }))
                }
              >
                신부측
              </button>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between items-center text-lg  ">
            성함 :{' '}
            <input
              className=" w-48 h-8 bg-gray-100 rounded-md"
              type="text"
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="flex flex-row w-full justify-between items-center text-lg  ">
            참석인원 :{' '}
            <input
              className=" w-48 h-8 bg-gray-100 rounded-md"
              type="text"
              onChange={handleChange}
              name="member"
            />
          </div>
          <div className="flex flex-row w-full justify-between items-center text-lg  ">
            식사 여부 :
            <div className="flex gap-1 w-48 justify-between">
              {/* map으로 refact */}
              <button
                className={`rounded-md  py-2 px-3  ${info.dine == '예정' ? 'text-white bg-primary' : 'text-gray-700  bg-gray-200'}`}
                onClick={() => setInfo((prev) => ({ ...prev, dine: '예정' }))}
              >
                예정
              </button>
              <button
                className={`rounded-md  py-2 px-3  ${info.dine == '안함' ? 'text-white bg-primary' : 'text-gray-700  bg-gray-200'}`}
                onClick={() => setInfo((prev) => ({ ...prev, dine: '안함' }))}
              >
                안함
              </button>
              <button
                className={`rounded-md  py-2 px-3  ${info.dine == '미정' ? 'text-white bg-primary' : 'text-gray-700  bg-gray-200'} `}
                onClick={() => setInfo((prev) => ({ ...prev, dine: '미정' }))}
              >
                미정
              </button>
            </div>
          </div>
          <button
            className="bg-primary rounded-md py-3 w-full text-white text-lg"
            onClick={() => setStep(1)}
          >
            참석의사 전달하기
          </button>
        </div>
      )}
    </div>
  );
};
export default RsvpModal;
