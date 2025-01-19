import CircleMinusIcon from '../../icons/CircleMinusIcon';
import ShareIcon from '../../icons/ShareIcon';

const CardHeader = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-between w-full py-2 px-2 bg-transparent text-white font-Paperlogy">
      <button>
        <CircleMinusIcon />
      </button>
      {/* 청첩장 제목 입력값 */}
      <div className="text-xs font-medium px-2">제목</div>
      <button className="">
        <ShareIcon />
      </button>
    </div>
  );
};

export default CardHeader;
