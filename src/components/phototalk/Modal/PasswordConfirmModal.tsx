import { ACTION_MODE } from '@/constants/photoTalkUserConstants';
import { ActionMode } from '@/types/photoTalkUserTypes';
import CloseIcon from '@icons/CloseIcon';

interface PasswordConfirmModalProps {
  mode: ActionMode | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  passwordInput: string;
  setPasswordInput: (password: string) => void;
  errorMessage?: string;
  setErrorMessage?: (message: string) => void;
}

const PasswordConfirmModal = ({
  mode,
  isOpen,
  onClose,
  onConfirm,
  passwordInput,
  setPasswordInput,
  errorMessage,
  setErrorMessage,
}: PasswordConfirmModalProps) => {
  if (!isOpen || !mode) return null;

  const modeTextMap = {
    [ACTION_MODE.EDIT]: {
      message: '관리자 및 작성자만 편집할 수 있습니다.',
      buttonText: '편집하기',
    },
    [ACTION_MODE.DELETE]: {
      message: '관리자 및 작성자만 삭제할 수 있습니다.',
      buttonText: '삭제하기',
    },
  };

  const { message, buttonText } = modeTextMap[mode];

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-modal-title"
      className="max-w-[520px] flex-center fixed m-auto inset-0 z-50 bg-black/70 h-full w-full rounded-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 backdrop-blur-3xl rounded-2xl shadow-custom min-h-fit column-center pb-6"
      >
        <header className="flex-between w-full p-3">
          <h2 id="password-modal-title" className="sr-only">
            비밀번호 확인 모달
          </h2>
          <button onClick={onClose} aria-label="모달 닫기">
            <CloseIcon className="size-5 text-gray-900" strokeWidth="1.8" />
          </button>
        </header>

        <main className="flex flex-col items-center w-full py-4 px-8 gap-8">
          <p className="text-sm text-black">{message}</p>

          <div className="flex flex-col w-full gap-1">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setErrorMessage?.('');
              }}
              aria-label="비밀번호 입력"
              placeholder="비밀번호를 입력하세요"
              className="rounded-xl border-none text-xs bg-white/100 p-3 focus:ring-1 focus:ring-gray-300 placeholder:text-black/30 focus-visible:outline-1"
              autoFocus
            />

            {errorMessage && (
              <p className="text-xs text-red-500 font-light px-1">
                {errorMessage}
              </p>
            )}

            <button
              onClick={onConfirm}
              aria-label={buttonText}
              className="p-3 text-xs text-white font-light rounded-xl bg-gradient-to-br from-[#000000] to-[#242424] mt-1"
            >
              {buttonText}
            </button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default PasswordConfirmModal;
