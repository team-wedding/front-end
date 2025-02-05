import PenIcon from '@icons/PenIcon';
import SearchIcon from '@icons/SearchIcon';
import { useNavigate } from 'react-router';

const CardFooter = ({ id: invitationId, userId }: { id: number, userId: number }) => {
  const navigate = useNavigate()
  return (
    <div className="bottom-0 left-0 border-l border-r border-b flex justify-evenly items-center bg-white text-[8px] text-gray-400 h-[36px] w-full rounded-b-lg py-3 px-1">
      <button className="flex-center gap-1 hover:opacity-30  transition-all duration-100" onClick={() => navigate(`/edit/${invitationId}`)}>
        <PenIcon />
        <div>수정하기</div>
      </button>
      <div className="border-l h-full"></div>
      <button className="flex-center gap-1 hover:opacity-30 transition-all duration-100" onClick={() => navigate(`/result/${userId}/${invitationId}`)}>
        <SearchIcon />
        <div>미리보기</div>
      </button>
    </div>
  );
};

export default CardFooter;
