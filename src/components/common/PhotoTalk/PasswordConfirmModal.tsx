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
        className="result-layout fixed inset-0 z-50 bg-black bg-opacity-50 h-full md:my-0 rounded-none"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-md h-1/4 min-h-fit"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h2 className="text-base font-semibold text-gray-900">
                {isEditMode ? '포토톡 편집하기' : '포토톡 삭제하기'}
              </h2>
              <button onClick={onClose}>
                <CloseIcon className="size=[20px]" />
              </button>
            </div>
            <div className="flex flex-col p-4">
              <p className="text-sm font-light m-4 px-4 flex justify-center">
                {isEditMode
                  ? '관리자 및 작성자만 편집할 수 있습니다.'
                  : '비밀번호를 입력해야 삭제할 수 있습니다.'}
              </p>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="formInput m-4 mb-2"
                autoFocus
              />
              <div className="flex justify-center">
                <button
                  onClick={onConfirm}
                  className="w-full m-4 px-4 py-2 border bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  {isEditMode ? '편집하기' : '삭제하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PasswordConfirmModal;
