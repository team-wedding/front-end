interface ModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const NameInputModal = ({ isOpen, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="font-Paperlogy fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-80">
        <div className="pt-12 pb-8 text-center text-base">
          <p>
            신랑 및 신부의 이름을
            <br />
            모두 입력해주세요.
          </p>
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

export default NameInputModal;
