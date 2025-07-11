import { useCallback, useEffect, useState } from 'react';
import NextIcon from '@icons/NextIcon';
import { useInvitationStore } from '@store/useInvitaionStore';
import CloseIcon from '@icons/CloseIcon';
import { usePostInvitation } from '@/hooks/useInvitation';
import { defaultInvitationValues } from '@/actions/invitationAction';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
}

const MAX_LENGTH: number = 8;

const InputTitleModal = ({ onClose }: ModalProps) => {
  const [titleInput, setTitleInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const setInvitationTitle = useInvitationStore(
    (state) => state.setInvitationTitle,
  );
  const { mutateAsync: postMutate } = usePostInvitation();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length <= MAX_LENGTH) {
      setTitleInput(input);
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Enter' && titleInput.length > 0) {
        handleConfirm();
      }
    },
    [onClose, titleInput],
  );

  const initialDetail = defaultInvitationValues;

  const handleConfirm = () => {
    setInvitationTitle(titleInput);
    postMutate({
      ...initialDetail,
      title: titleInput,
    });
  };

  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  if (!modalRoot) {
    throw new Error(
      'Modal root element not found. Make sure <div id="modal-root" /> exists in index.html.',
    );
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <div
      className="max-w-[520px] fixed m-auto inset-0 z-50 flex-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="input-title-modal"
      aria-describedby="input-title-description"
    >
      <main className="bg-white/95 backdrop-blur-2xl dark:bg-surface-muted-dark rounded-2xl shadow-xl w-[80%] flex flex-col relative border border-white/30 dark:border-black/20">
        <header className="absolute top-3 right-3">
          <button
            className="text-label dark:text-label-dark hover:text-label-secondary/60 dark:hover:text-label-secondary-dark/60 p-2"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon className="size-6" strokeWidth="1.6" />
          </button>
        </header>

        <div className="py-20 space-y-6 text-label dark:text-label-dark">
          <label htmlFor="invitationTitle" className="text-xl text-center">청첩장 제목을 만들어 주세요</label>

          <div className="flex-center">
            <div className="relative w-[80%] m-auto">
              <input
                type="text"
                name="invitation-title"
                placeholder="청첩장1, 친구용, 혼주용"
                className={`w-full bg-transparent text-start tracking-wider text-label border-0 border-b-2 dark:text-label-dark focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white dark:border-border-dark text-md placeholder:text-label-secondary/30 placeholder:text-center dark:placeholder:text-label-secondary-dark/30 ${
                  isFocused ? 'border-gray-800' : 'border-gray-300'
                }`}
                value={titleInput}
                autoFocus
                onChange={handleTitleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={MAX_LENGTH}
              />
              <div
                className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-rose-400 to-blue-300 transition-all duration-300 transform -translate-x-1/2 ${
                  isFocused ? 'w-full' : 'w-0'
                }`}
              />
            </div>

            <div className="absolute bottom-12 flex justify-center">
              <div className="text-sm text-gray-500 font-light tracking-widest">
                <span
                  className={`transition-colors duration-200 ${
                    titleInput.length === MAX_LENGTH
                      ? 'text-rose-500 font-medium'
                      : ''
                  }`}
                >
                  {titleInput.length}
                </span>
                <span>/</span>
                <span>{MAX_LENGTH}</span>
                <span className="ml-1"></span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              data-testid="title-submit"
              disabled={titleInput.length === 0}
              className={`absolute right-10 rounded-full p-1 ${
                titleInput.length === 0
                  ? 'bg-black/5 dark:bg-white/5 cursor-not-allowed'
                  : 'bg-black dark:bg-white cursor-pointer hover:bg-black/80 dark:hover:bg-white/50'
              }`}
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </main>
    </div>,
    modalRoot,
  );
};

export default InputTitleModal;
