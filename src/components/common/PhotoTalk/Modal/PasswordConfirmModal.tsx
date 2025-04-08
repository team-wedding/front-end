import { ACTION_MODE, ActionMode } from '@/types/users';
import CloseIcon from '@icons/CloseIcon';

interface PasswordConfirmModalProps {
  mode: ActionMode | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  passwordInput: string;
  setPasswordInput: (password: string) => void;
}

const PasswordConfirmModal = ({
  mode,
  isOpen,
  onClose,
  onConfirm,
  passwordInput,
  setPasswordInput,
}: PasswordConfirmModalProps) => {
  if (!isOpen || !mode) return null;

  const modeTextMap = {
    [ACTION_MODE.EDIT]: {
      message: '관리자 및 작성자만 편집할 수 있습니다.',
      buttonText: '편집하기',
    },
    [ACTION_MODE.DELETE]: {
      message: '비밀번호를 입력해야 삭제할 수 있습니다.',
      buttonText: '삭제하기',
    },
  };

  const { message, buttonText } = modeTextMap[mode];

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-modal-title"
      className="max-w-[520px] flex-center fixed m-auto inset-0 z-50 bg-black bg-opacity-50 h-full w-full rounded-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-custom min-h-fit column-center pb-4"
      >
        <header className="flex-between px-4 py-3 rounded-t border-b-2 border-black/0 w-full text-black/80">
          <h2 id="password-modal-title" className="sr-only">
            비밀번호 확인 모달
          </h2>
          <button onClick={onClose} aria-label="모달 닫기">
            <CloseIcon className="size-6" />
          </button>
        </header>

        <main className="flex flex-col items-center w-full px-12 py-4 gap-7">
          <p className="text-sm font-light text-black">{message}</p>

          <div className="flex flex-col w-full gap-2">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              aria-label="비밀번호 입력"
              placeholder="비밀번호를 입력하세요"
              className="rounded-xl border-none text-xs bg-white/100 p-3 focus:ring-1 focus:ring-white/100 placeholder:text-black/30 focus-visible:outline-1"
              autoFocus
            />

            <button
              onClick={onConfirm}
              aria-label={buttonText}
              className="p-3 text-xs text-white font-light rounded-xl bg-gradient-to-br from-[#000000] via-[#232323] to-[#494949]"
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
