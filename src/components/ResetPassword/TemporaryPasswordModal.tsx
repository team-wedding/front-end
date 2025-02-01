interface ModalProps {
    isOpen: boolean;
    onConfirm: () => void;
}

const TemporaryPassword = ({ isOpen, onConfirm }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-80">

                <div className="pt-12 pb-8 text-center text-base leading-relaxed">
                    <p>입력한 주소로<br />임시 비밀번호가 전송되었습니다.</p>
                </div>

                <div className="flex border-t border-gray-300">
                    <button
                        className="w-full py-3 text-red-500"
                        onClick={onConfirm}
                    >
                        확인
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TemporaryPassword;