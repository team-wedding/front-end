import { Dispatch, SetStateAction, useState } from 'react';
import CloseIcon from '@icons/CloseIcon';
import { GuestInfo } from '@/types/GuestType';
import { postAttendance } from '@/services/statsService';
import { useParams } from 'react-router';

type InfoDetail = Omit<GuestInfo, 'userId' | 'invitationId'>;

interface ModalProp {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const RsvpModal = ({ setModal }: ModalProp) => {
  const [info, setInfo] = useState<InfoDetail>({
    attendance: true,
    isGroomSide: true,
    isBrideSide: false,
    name: '',
    contact: '',
    companions: 0,
    isDining: '예정',
  });

  const { userId, invitationId } = useParams();

  //FIX 비어있는 값일때 처리 필요
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // console.log(id);
      const response = await postAttendance({ ...info, userId: Number(userId), invitationId: Number(invitationId) });
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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div
        className={`flex flex-col py-5 px-5 bg-white w-[350px] rounded-xl border`}
      >
        <button
          className="flex justify-end items-center"
          onClick={() => setModal(false)}
        >
          <CloseIcon className={''} />
        </button>
        <div className="flex flex-col items-center gap-6 p-1">
          <div className="text-xl font-medium">참석 의사 전달</div>
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
              className="w-52 h-8 bg-gray-50 rounded-md splash-input text-base"
              type="text"
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="flex flex-row w-full justify-between items-center text-base">
            연락처:{' '}
            <input
              className="w-52 h-8 bg-gray-50 rounded-md splash-input text-base"
              type="text"
              onChange={handleChange}
              name="contact"
              placeholder="숫자만 입력"
            />
          </div>
          <div className="flex flex-row w-full justify-between items-center text-base">
            참석인원:{' '}
            <input
              className=" w-52 h-8 bg-gray-50 rounded-md splash-input text-base"
              type="number"
              onChange={handleChange}
              placeholder="본인 제외 총 참석인원"
              name="companions"
            />
          </div>
          <div className="flex flex-row w-full justify-between items-center text-base">
            식사여부:{' '}
            <div className="flex gap-1 w-52 justify-between">
              {/* map으로 refact */}
              <button
                className={`rounded-md  p-1 w-1/3  ${info.isDining == '예정' ? 'text-white bg-button' : 'text-gray-700  bg-gray-200'}`}
                onClick={() =>
                  setInfo((prev) => ({ ...prev, isDining: '예정' }))
                }
              >
                예정
              </button>
              <button
                className={`rounded-md  p-1 w-1/3  ${info.isDining == '안함' ? 'text-white bg-button' : 'text-gray-700  bg-gray-200'}`}
                onClick={() =>
                  setInfo((prev) => ({ ...prev, isDining: '안함' }))
                }
              >
                안함
              </button>
              <button
                className={`rounded-md  p-1 w-1/3 ${info.isDining == '미정' ? 'text-white bg-button' : 'text-gray-700  bg-gray-200'} `}
                onClick={() =>
                  setInfo((prev) => ({ ...prev, isDining: '미정' }))
                }
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
      </div>
    </div>
  );
};
export default RsvpModal;