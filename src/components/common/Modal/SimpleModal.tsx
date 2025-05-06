interface ModalProps {
  isOpen: boolean;
  message: string | React.ReactNode;
  onConfirm: () => void;
}

const SimpleModal = ({ isOpen, message, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="font-Paperlogy fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-80">
        <div className="flex items-center justify-center pt-4 text-center text-base h-[132px]">
          <p>{message}</p>
        </div>

        <div className="flex border-t border-gray-300">
          <button className="w-full py-3 text-red-500" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
