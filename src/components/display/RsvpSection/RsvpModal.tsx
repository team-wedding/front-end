import { Dispatch, SetStateAction, useState } from 'react';
import CloseIcon from '@icons/CloseIcon';
import HeartIcon from '@icons/HeartIcon';
import CalendarIcon from '@icons/CalendarIcon';
import PinIcon from '@icons/PinIcon';
import { GuestInfo } from '@/types/GuestType';
import { postAttendance } from '@/services/statsService';
import { useUserStore } from '@/store/useUserStore';

type InfoDetail = Omit<GuestInfo, 'userId' | 'invitationId'>;

interface ModalProp {
  bride: string;
  groom: string;
  date: string;
  time: string;
  location: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const RsvpModal = ({
  bride,
  groom,
  date,
  time,
  location,
  setModal,
}: ModalProp) => {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState<InfoDetail>({
    attendance: true,
    isGroomSide: true,
    isBrideSide: false,
    name: '',
    contact: '',
    companions: 0,
    isDining: '예정',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { id } = useUserStore();

  const handleSubmit = async () => {
    try {
      console.log(id);
      const response = await postAttendance({ ...info, userId: id, invitationId: 1 });
      console.log(response);
      setModal(false);
    } catch (error) {
      console.log('개인 참석 여부 등록 실패', error);
    }
  };

  //TODO : 동적으로 색 바꿀수있게 props로 받아서 차리
  //TODO : 재사용할수있는 코드 리팩토링 특히 인풋
  return (
    <div
      className={`fixed  z-50 top-0 left-0 size-full flex justify-center pt-10`}
    >
      <div className="absolute top-0 left-0 w-screen h-screen bg-black/60 z-10"></div>
      <div
        className={`absolute z-30 flex flex-col py-6 px-5 bg-white  w-[350px] rounded-xl  border`}
      >
        <button
          className="absolute top-5 right-8"
          onClick={() => setModal(false)}
        >
          <CloseIcon className={''} />
        </button>
        {step == 0 ? (
          <div className="flex flex-col items-center gap-8">
            <div className="text-xl font-semibold">참석 의사 전달</div>
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
              className="bg-button rounded-md py-2 w-full text-white"
              onClick={() => setStep(1)}
            >
              참석의사 전달하기
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="text-xl font-semibold">참석 의사 전달</div>
            <div className="flex flex-row w-full gap-8 items-center justify-between text-base">
              구분:
              <div className="flex gap-1 w-52 justify-between">
                <button
                  className={`rounded-md px-2 py-2 w-1/2 ${info.isGroomSide ? 'text-white bg-button' : 'text-gray-700 bg-gray-200'} `}
                  onClick={() =>
                    setInfo((prev) => ({ ...prev, isGroomSide: true, isBrideSide: false }))
                  }
                >
                  신랑측
                </button>
                <button
                  className={`rounded-md px-2 py-2 w-1/2 ${info.isBrideSide ? 'text-white bg-button' : 'text-gray-700 bg-gray-200'} `}
                  onClick={() =>
                    setInfo((prev) => ({ ...prev, isGroomSide: false, isBrideSide: true }))
                  }
                >
                  신부측
                </button>
              </div>
            </div>
            <div className="flex flex-row w-full gap-2 items-center justify-between text-base">
              <div>참석여부: </div>
              <div className={`flex flex-row justify-between gap-1 w-52`}>
                <button
                  className={`rounded-md p-1 w-1/2 ${info.attendance ? 'text-white bg-button' : 'text-gray-700 bg-gray-200'}`}
                  onClick={() => setInfo((prev) => ({ ...prev, attendance: true }))}
                >
                  참석할게요
                </button>
                <button
                  className={`rounded-md p-1 w-1/2 text-base ${!info.attendance ? 'text-white bg-button' : 'text-gray-700 bg-gray-200'}`}
                  onClick={() =>
                    setInfo((prev) => ({ ...prev, attendance: false }))
                  }
                >
                  참석이
                  <br /> 어려워요
                </button>
              </div>
            </div>
            <div className="flex flex-row w-full justify-between items-center text-base">
              성함:{' '}
              <input
                className="w-52 h-8 bg-gray-100 rounded-md splash-input text-base"
                type="text"
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="flex flex-row w-full justify-between items-center text-base">
              연락처:{' '}
              <input
                className="w-52 h-8 bg-gray-100 rounded-md splash-input text-base"
                type="text"
                onChange={handleChange}
                name="contact"
              />
            </div>
            <div className="flex flex-row w-full justify-between items-center text-base">
              참석인원:{' '}
              <input
                className=" w-52 h-8 bg-gray-100 rounded-md splash-input text-base"
                type="number"
                onChange={handleChange}
                placeholder='본인 제외 총 참석인원'
                name="companions"
              />
            </div>
            <div className="flex flex-row w-full justify-between items-center text-base">
              식사여부:{' '}
              <div className="flex gap-1 w-52 justify-between">
                {/* map으로 refact */}
                <button
                  className={`rounded-md  p-1 w-1/3  ${info.isDining == '예정' ? 'text-white bg-button' : 'text-gray-700  bg-gray-200'}`}
                  onClick={() => setInfo((prev) => ({ ...prev, isDining: '예정' }))}
                >
                  예정
                </button>
                <button
                  className={`rounded-md  p-1 w-1/3  ${info.isDining == '안함' ? 'text-white bg-button' : 'text-gray-700  bg-gray-200'}`}
                  onClick={() => setInfo((prev) => ({ ...prev, isDining: '안함' }))}
                >
                  안함
                </button>
                <button
                  className={`rounded-md  p-1 w-1/3 ${info.isDining == '미정' ? 'text-white bg-button' : 'text-gray-700  bg-gray-200'} `}
                  onClick={() => setInfo((prev) => ({ ...prev, isDining: '미정' }))}
                >
                  미정
                </button>
              </div>
            </div>
            <button
              className="bg-button rounded-md py-3 w-full text-white text-medium"
              onClick={handleSubmit}
            >
              참석의사 전달하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default RsvpModal;
