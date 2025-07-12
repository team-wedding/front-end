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
        <div className="relative bg-surface dark:bg-surface-muted-dark rounded-lg shadow-lg w-80">
          <div className="flex justify-end items-center">
            <button
              className="text-label dark:text-label-dark my-3 mx-4"
              onClick={onCancel}
              aria-label="Close modal"
            >
              <CloseIcon className="h-5" />
            </button>
          </div>

          <div className="mt-2 mb-10 mx-8 text-label dark:text-label-dark text-center text-base leading-relaxed">
            <p>{title}</p>
          </div>

          <div className="flex border-t border-border dark:border-border-dark">
            <button
              className="w-1/2 py-3 text-label-secondary/60 dark:text-label-secondary-dark/60 text-sm"
              onClick={onCancel}
            >
              취소
            </button>
            <div className="w-px bg-border dark:bg-border-dark"></div>
            <button
              className="w-1/2 py-3 text-status-error dark:text-status-error-dark text-sm"
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
