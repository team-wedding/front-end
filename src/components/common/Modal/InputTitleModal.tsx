import { useState } from "react";
import { useNavigate } from 'react-router';
import NextIcon from '../../icons/NextIcon';
import { useInvitationStore } from "../../../store/useInvitaionStore";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InputTitleModal = ({ isOpen, onClose }: ModalProps) => {
    const [titleInput, setTitleInput] = useState("");
    const { setTitle } = useInvitationStore();
    const navigate = useNavigate();

    const maxLength = 8;

    if (!isOpen) return null; // 모달이 닫힌 경우 렌더링하지 않음

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length <= maxLength) {
            setTitleInput(input);
        }
    };

    const handleConfirm = () => {
        setTitle(titleInput); // 입력한 제목을 상태에 저장
        navigate("/create"); // 페이지 이동
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* 모달 내용 */}
            <div className="relative bg-white rounded-lg shadow-lg w-80">
                {/* 닫기 버튼 */}
                <div className="flex justify-end items-center p-4">
                    <button
                        className="text-black"
                        onClick={onClose}
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

                <div className="pb-1 text-center text-base">
                    <p>청첩장 제목을 정해주세요</p>
                </div>

                <div className="flex w-full justify-center gap-2 px-10 pt-4 pb-10">
                    <input
                        type="text"
                        placeholder="ex. 청첩장1, 친구용, 혼주용"
                        className="focus:outline-none focus:ring-0 focus:border-rose-300 border-0 border-b border-gray-500 text-xs"
                        value={titleInput}
                        onChange={handleTitleChange}
                    />
                    {/* 입력 가능한 문자 표시 */}
                    <div className="text-[8px] text-gray-500 flex justify-center items-center">
                        {titleInput.length} / {maxLength}
                    </div>
                    <button
                        onClick={handleConfirm}
                        disabled={titleInput.length === 0}
                        className={`rounded-full w-8 h-8 flex justify-center items-center ${titleInput.length === 0
                            ? "bg-black bg-opacity-10 cursor-not-allowed"
                            : "bg-rose-300 cursor-pointer"
                            }`}>
                        <NextIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputTitleModal;