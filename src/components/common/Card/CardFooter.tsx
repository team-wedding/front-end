import ShareIcon from '@icons/ShareIcon';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import ShareInvitation from '../Share/ShareInvitation';
import { useUserStore } from '@/store/useUserStore';
import { useGetInvitation } from '@/hooks/useInvitation';

interface CardFooterProps {
  title: string;
  image: string;
  id: number;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const CardFooter = ({ title, image, id }: CardFooterProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const parentRef = useRef<HTMLButtonElement>(null);
  const { id: userId } = useUserStore();

  const { invitations } = useGetInvitation(id);
  const createdAt = invitations?.createdAt.split('T')[0];

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
    <main
      className="flex-between w-full h-14 rounded-b-2xl
     px-4"
    >
      {/* 청첩장 제목 입력값 */}
      <div>
        <span className="text-md font-medium text-white">{title}</span>
        <div className="text-[9px] font-extralight text-white/50 tracking-wide">
          {createdAt}
        </div>
      </div>

      <button
        ref={parentRef}
        tabIndex={-1}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="text-white/90"
      >
        <ShareIcon />
        {isFocused && (
          <ShareInvitation
            setIsFocused={setIsFocused}
            isFocused={isFocused}
            shareTitle={title}
            shareDesc={'결혼합니다'}
            shareImage={image}
            shareUrl={`http://localhost:5173/result/${userId}/${id}`}
            shareHeader={''}
          />
        )}
      </button>
    </main>
  );
};

export default CardFooter;
