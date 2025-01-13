import { useState } from 'react';
import CirclePlusIcon from '../../icons/CirclePlusIcon';
import InputTitleModal from '../Modal/InputTitleModal';

const CreateCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const handleOpenModal = () => setIsModalOpen(true);

  // 모달 닫기
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="column-center gap-2 outline-dotted outline-gray-400 rounded-lg w-[150px] h-[225px] bg-gray-100 font-light text-xs text-gray-500 opacity-60 cursor-pointer hover:bg-background hover:bg-opacity-50 hover:text-black hover:shadow-xl hover:outline-transparent transition-all duration-300 delay-100 ease-in-out"
        onClick={handleOpenModal} // 버튼 클릭 시 모달 열기
      >
        <button>
          <CirclePlusIcon />
        </button>
        <div>청첩장 만들기</div>
      </div>

      {/* 모달 */}
      <InputTitleModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default CreateCard;
