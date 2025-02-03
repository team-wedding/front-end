import { useState } from 'react';
import { useNavigate } from 'react-router';
import NextIcon from '@icons/NextIcon';
import { useInvitationStore } from '@store/useInvitaionStore';
import CloseIcon from '@icons/CloseIcon';

interface ModalProps {
  onClose: () => void;
}

const InputTitleModal = ({ onClose }: ModalProps) => {
  const [titleInput, setTitleInput] = useState('');
  const { setInvitationTitle } = useInvitationStore();
  const navigate = useNavigate();

  const maxLength = 8;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length <= maxLength) {
      setTitleInput(input);
    }
  };

  const handleConfirm = () => {
    setInvitationTitle(titleInput); // 입력한 제목을 상태에 저장
    navigate('/create'); // 페이지 이동
  };

  return (
    <div className="fixed inset-0 z-50 flex-center bg-black bg-opacity-50">
      {/* 모달 내용 */}
      <div className="bg-white rounded-lg shadow-lg w-80 px-4 pt-4 pb-10">
        {/* 닫기 버튼 */}
        <div className="flex justify-end items-center">
          <button
            className="text-black hover:text-gray-400"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon className="w-5" />
          </button>
        </div>

        <div className="p-1 text-center text-base">
          <p>청첩장 제목을 정해주세요</p>
        </div>

        <div className="flex w-full justify-center gap-2 my-4">
          <input
            type="text"
            placeholder="ex. 청첩장1, 친구용, 혼주용"
            className="text-center w-[60%] focus:outline-none focus:ring-0 focus:border-rose-300 border-0 border-b border-gray-500 text-xs placeholder:text-gray-300 ml-4"
            value={titleInput}
            autoFocus
            onChange={handleTitleChange}
          />
          {/* 입력 가능한 문자 표시 */}
          <div className="text-[8px] text-gray-400 flex justify-center items-center">
            {titleInput.length} / {maxLength}
          </div>
          <button
            onClick={handleConfirm}
            disabled={titleInput.length === 0}
            className={`rounded-full w-8 h-8 flex justify-center items-center ${titleInput.length === 0
              ? 'bg-black bg-opacity-10 cursor-not-allowed'
              : 'bg-rose-300 cursor-pointer hover:bg-rose-200'
              }`}
          >
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputTitleModal;
