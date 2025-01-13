interface ModalProps {
    isOpen: boolean;
    title: string;
    confirmText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ReusableModal = ({ isOpen, title, confirmText, onConfirm, onCancel }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-80">

                <div className="flex justify-end items-center p-4">
                    <button
                        className="text-black"
                        onClick={onCancel}
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="pt-2 pb-8 text-center text-base">
                    <p>{title}</p>
                </div>

                <div className="flex border-t border-gray-300">
                    <button
                        className="w-1/2 py-3 text-gray-500"
                        onClick={onCancel}
                    >
                        취소
                    </button>
                    <div className="w-px bg-gray-300"></div>
                    <button
                        className="w-1/2 py-3 text-red-500"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReusableModal;