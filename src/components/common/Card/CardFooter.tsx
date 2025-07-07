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
  const shareUrl = `result/${userId}/${id}`;

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
      className="flex-between h-[68px]
    pl-3 pr-1 absolute bottom-0 bg-black/60 w-full rounded-b-xl"
    >
      <div className="flex flex-col items-start">
        <h2 className="text-base font-medium text-label-overlay">{title}</h2>
        <span className="text-xs font-light text-label-overlay/80">
          {createdAt}
        </span>
      </div>

      <button
        ref={parentRef}
        aria-label="공유하기"
        tabIndex={-1}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={handleFocus}
        type="button"
        aria-haspopup="true"
        aria-expanded={isFocused}
        className="text-label-overlay/90 p-2"
      >
        <ShareIcon />
        {isFocused && (
          <ShareInvitation
            setIsFocused={setIsFocused}
            isFocused={isFocused}
            shareTitle={title}
            shareDesc={'결혼합니다'}
            shareImage={image}
            shareUrl={shareUrl}
            shareHeader={'WOOGYEOL'}
          />
        )}
      </button>
    </footer>
  );
};

export default CardFooter;
