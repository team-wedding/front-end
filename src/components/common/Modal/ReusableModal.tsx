import CloseIcon from '../../icons/CloseIcon';

interface ModalProps {
  isOpen: boolean;
  title: string | React.ReactNode;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ReusableModal = ({
  isOpen,
  title,
  confirmText,
  onConfirm,
  onCancel,
}: ModalProps) => {
  // if (!isOpen) return null;

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg shadow-lg w-80">
          <div className="flex justify-end items-center">
            <button
              className="text-black my-3 mx-4"
              onClick={onCancel}
              aria-label="Close modal"
            >
              <CloseIcon className="h-5" />
            </button>
          </div>

          <div className="mt-2 mb-10 text-center text-base leading-relaxed">
            <p>{title}</p>
          </div>

          <div className="flex border-t border-gray-300">
            <button
              className="w-1/2 py-3 text-gray-500 text-sm"
              onClick={onCancel}
            >
              취소
            </button>
            <div className="w-px bg-gray-300"></div>
            <button
              className="w-1/2 py-3 text-red-500 text-sm"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReusableModal;
