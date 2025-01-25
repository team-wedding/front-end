import { useState } from 'react';
import CloseIcon from '@icons/CloseIcon';

const PasswordConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}) => {
  const [passwordInput, setPasswordInput] = useState('');

  const handleConfirm = () => {
    onConfirm(passwordInput);
    setPasswordInput('');
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => {
        setPasswordInput('');
        onClose();
      }}
      className="page-container fixed inset-0 z-50 bg-black bg-opacity-50"
    >
      <div className="preview-section py-80">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-md h-3/4 min-h-fit"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h2 className="text-base font-semibold text-gray-900">
                포토톡 편집하기
              </h2>
              <button
                onClick={() => {
                  setPasswordInput('');
                  onClose();
                }}
              >
                <CloseIcon className="size=[20px]" />
              </button>
            </div>
            <div className="flex flex-col p-4">
              <p className="text-sm font-light m-4 px-4 flex justify-center">
                관리자 및 작성자만 편집할 수 있습니다.
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
                  onClick={handleConfirm}
                  className="w-full m-4 px-4 py-2 border bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  편집하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirmModal;
