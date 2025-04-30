import { useState } from 'react';
import NextIcon from '@icons/NextIcon';
import { useInvitationStore } from '@store/useInvitaionStore';
import CloseIcon from '@icons/CloseIcon';
import { usePostInvitation } from '@/hooks/useInvitation';
import { defaultInvitationValues } from '@/actions/invitationAction';

interface ModalProps {
  onClose: () => void;
}

const InputTitleModal = ({ onClose }: ModalProps) => {
  const [titleInput, setTitleInput] = useState('');
  const { setInvitationTitle } = useInvitationStore();
  const { mutateAsync: postMutate } = usePostInvitation();

  const maxLength = 8;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length <= maxLength) {
      setTitleInput(input);
    }
  };

  const initialDetail = defaultInvitationValues
  const handleConfirm = () => {
    setInvitationTitle(titleInput); // 입력한 제목을 상태에 저장
    postMutate({
      ...initialDetail,
      title: titleInput
    })
  };

  return (
    <div className="fixed inset-0 z-50 flex-center bg-black bg-opacity-50">
      {/* 모달 내용 */}
      <div className="bg-surface dark:bg-surface-muted-dark rounded-lg shadow-lg w-80 px-4 pt-4 pb-10">
        {/* 닫기 버튼 */}
        <div className="flex justify-end items-center">
          <button
            className="text-label dark:text-label-dark hover:text-label-secondary/60 dark:hover:text-label-secondary-dark/60"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon className="w-5" />
          </button>
        </div>

        <div className="p-1 text-center text-base text-label dark:text-label-dark">
          <p>청첩장 제목을 정해주세요</p>
        </div>

        <div className="flex w-full justify-center gap-2 my-4">
          <input
            type="text"
            placeholder="ex. 청첩장1, 친구용, 혼주용"
            className="bg-surface dark:bg-surface-dark text-center text-label dark:text-label-dark w-[60%] focus:outline-none focus:ring-0 focus:border-secondary dark:focus:border-secondary-dark border-0 border-b border-border dark:border-border-dark text-xs placeholder:text-label-secondary/60 dark:placeholder:text-label-secondary-dark/60 ml-4"
            value={titleInput}
            autoFocus
            onChange={handleTitleChange}
          />
          {/* 입력 가능한 문자 표시 */}
          <div className="text-[8px] text-label-secondary/60 dark:text-label-secondary-dark/60 flex justify-center items-center">
            {titleInput.length} / {maxLength}
          </div>
          <button
            onClick={handleConfirm}
            disabled={titleInput.length === 0}
            className={`rounded-full w-8 h-8 flex justify-center items-center ${titleInput.length === 0
                ? 'bg-surface-muted dark:bg-surface-muted-dark cursor-not-allowed'
                : 'bg-secondary/30 dark:bg-secondary-dark/30 cursor-pointer hover:bg-secondary/20 dark:hover:bg-secondary-dark/20'
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
