import CircleMinusIcon from '@icons/CircleMinusIcon';
import ShareIcon from '@icons/ShareIcon';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import ShareInvitation from '../Share/ShareInvitation';
import { useUserStore } from '@/store/useUserStore';

interface CardHeaderProp {
  title: string,
  image: string,
  id: number
  setModal: Dispatch<SetStateAction<boolean>>
}


const CardHeader = ({ title, setModal, image, id }: CardHeaderProp) => {
  const [isFocused, setIsFocused] = useState(false);
  const parentRef = useRef<HTMLButtonElement>(null);
  const { id: userId } = useUserStore()

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
    <div className="absolute top-0 left-0 flex justify-between w-full py-2 px-2 bg-transparent text-white font-Paperlogy">
      <button onClick={() => setModal(true)}>
        <CircleMinusIcon />
      </button>
      {/* 청첩장 제목 입력값 */}
      <div className="text-xs font-medium px-2">{title}</div>
      <button
        ref={parentRef}
        tabIndex={-1}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className=""
      >
        <ShareIcon />
        {isFocused && (
          <ShareInvitation setIsFocused={setIsFocused} isFocused={isFocused} shareTitle={title} shareDesc={'결혼합니다'} shareImage={image} shareUrl={`https://woogyeol.vercel.app/result/${userId}/${id}`} shareHeader={''} />
        )}
      </button>
    </div>
  );
};

export default CardHeader;
