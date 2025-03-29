import CloseIcon from '@icons/CloseIcon';

interface PasswordConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  passwordInput: string;
  setPasswordInput: (password: string) => void;
  isEditMode: boolean; // 편집인지 삭제인지 구분
}

const PasswordConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  passwordInput,
  setPasswordInput,
  isEditMode,
}: PasswordConfirmModalProps) => {
  return (
    isOpen && (
      <div
        onClick={onClose}
        className="max-w-[520px] flex-center fixed m-auto inset-0 z-50 bg-black bg-opacity-50 h-full w-full rounded-none"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-custom min-h-fit column-center pb-4"
        >
          {/* <div className=""> */}
          <div className="flex-between px-4 py-3 rounded-t border-b-2 border-black/0 w-full text-black/80">
            <h2 className="text-base font-medium">
              {/* {isEditMode ? '포토톡 편집하기' : '포토톡 삭제하기'} */}
            </h2>
            <button onClick={onClose}>
              <CloseIcon className="size-6" />
            </button>
          </div>
          <div className="flex flex-col items-center w-full px-12 py-4 gap-7">
            <p className="text-sm font-light text-black">
              {isEditMode
                ? '관리자 및 작성자만 편집할 수 있습니다.'
                : '비밀번호를 입력해야 삭제할 수 있습니다.'}
            </p>

            <div className="flex flex-col w-full gap-2">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="rounded-xl border-none text-xs bg-white/100 p-3 focus:ring-1 focus:ring-white/100 placeholder:text-black/30 focus-visible:outline-1"
                autoFocus
              />

              <button
                onClick={onConfirm}
                className="p-3 text-xs text-white font-light rounded-xl bg-gradient-to-br from-[#000000] via-[#232323] to-[#494949]"
              >
                {isEditMode ? '편집하기' : '삭제하기'}
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    )
  );
};

export default PasswordConfirmModal;
