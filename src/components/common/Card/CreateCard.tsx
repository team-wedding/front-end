import { useState } from 'react';
import CirclePlusIcon from '@icons/CirclePlusIcon';
import InputTitleModal from '../Modal/InputTitleModal';

const CreateCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div
        className="column-center gap-2 outline-dotted outline-gray-400 rounded-lg w-[150px] h-[238px] bg-gray-100 text-xs text-gray-700 opacity-60 cursor-pointer hover:bg-button20 hover:text-black hover:shadow-lg hover:outline-transparent transition-all duration-300 delay-100 ease-in-out"
        onClick={handleModal}
      >
        <button>
          <CirclePlusIcon />
        </button>
        <div>청첩장 만들기</div>
      </div>
      {isModalOpen && <InputTitleModal onClose={handleModal} />}
    </>
  );
};

export default CreateCard;
