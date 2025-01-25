import PenIcon from '@icons/PenIcon';
import SearchIcon from '@icons/SearchIcon';
import { useNavigate } from 'react-router';
// import { v4 as uuidv4 } from "uuid";


const CardFooter = ({ id }: { id: number }) => {
  const navigate = useNavigate()
  // const newId = uuidv4();
  return (
    <div className="absolute bottom-0 left-0 flex justify-evenly items-center bg-white text-[8px] text-gray-400 h-[37px] w-full rounded-b-lg">
      <button className="flex-center gap-1 hover:opacity-30  transition-all duration-100" onClick={() => {
        // navigate(`/edit/${newId}`)
        navigate(`/edit/${id}`)
      }}>
        <PenIcon />
        <div>수정하기</div>
      </button>
      <div className="border-l h-full"></div>
      <button className="flex-center gap-1 hover:opacity-30 transition-all duration-100">
        <SearchIcon />
        <div>미리보기</div>
      </button>
    </div>
  );
};

export default CardFooter;
