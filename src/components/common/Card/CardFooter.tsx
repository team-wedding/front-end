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
  const createdAt = invitations?.createdAt?.split('T')[0];

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
    <footer
      className="flex-between h-[60px]
    px-4 absolute bottom-0 bg-black/60 w-full rounded-b-xl"
    >
      {/* 청첩장 제목 입력값 */}
      <div className="flex flex-col items-start">
        <h2 className="text-base font-medium text-label-overlay">{title}</h2>
        <span className="text-[10px] font-light text-label-overlay tracking-wide">
          {createdAt}
        </span>
      </div>

      <button
        ref={parentRef}
        aria-label="공유하기"
        tabIndex={-1}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="text-label-overlay"
      >
        <ShareIcon />
        {isFocused && (
          <ShareInvitation
            setIsFocused={setIsFocused}
            isFocused={isFocused}
            shareTitle={title}
            shareDesc={'결혼합니다'}
            shareImage={image}
            shareUrl={`result/${userId}/${id}`}
            shareHeader={'Woogyeol'}
          />
        )}
      </button>
    </footer>
  );
};

export default CardFooter;
