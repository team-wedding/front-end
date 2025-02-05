import CircleMinusIcon from '@icons/CircleMinusIcon';
import ShareIcon from '@icons/ShareIcon';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import ShareInvitation from '../Share/ShareInvitation';
import { useUserStore } from '@/store/useUserStore';

interface CardHeaderProp {
  title: string;
  image: string;
  id: number;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const CardHeader = ({ title, setModal, image, id }: CardHeaderProp) => {
  const [isFocused, setIsFocused] = useState(false);
  const parentRef = useRef<HTMLButtonElement>(null);
  const { id: userId } = useUserStore();

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (parentRef.current && parentRef.current.contains(event.relatedTarget)) {
      return;
    }
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="top-0 left-0 flex border-t border-r border-l rounded-t-lg items-center justify-between w-full h-[36px] p-2 bg-white bg-opacity-90 text-gray-600 font-Paperlogy">
      <button onClick={() => setModal(true)}>
        <CircleMinusIcon />
      </button>
      {/* 청첩장 제목 입력값 */}
      <div className="text-[10px] px-2">{title}</div>
      <button
        ref={parentRef}
        tabIndex={-1}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className=""
      >
        <ShareIcon />
        {isFocused && (
          <ShareInvitation
            setIsFocused={setIsFocused}
            isFocused={isFocused}
            shareTitle={title}
            shareDesc={'결혼합니다'}
            shareImage={image}
            shareUrl={`https://woogyeol.vercel.app/result/${userId}/${id}`}
            shareHeader={''}
          />
        )}
      </button>
    </div>
  );
};

export default CardHeader;
