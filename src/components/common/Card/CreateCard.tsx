import React from 'react';
import CirclePlusIcon from '../../icons/CirclePlusIcon';

interface CreateCardProps {
  onClick: () => void;
}

const CreateCard: React.FC<CreateCardProps> = ({ onClick }) => {
  return (
    <div
      className="column-center gap-2 outline-dotted outline-gray-400 rounded-lg w-[150px] h-[225px] bg-gray-100 font-light text-xs text-gray-500 opacity-60 cursor-pointer hover:bg-background hover:bg-opacity-50 hover:text-black hover:shadow-xl hover:outline-transparent transition-all duration-300 delay-100 ease-in-out"
      onClick={onClick}
    >
      <button>
        <CirclePlusIcon />
      </button>
      <div>청첩장 만들기</div>
    </div>
  );
};

export default CreateCard;
