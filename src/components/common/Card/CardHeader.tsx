import React, { useRef, useState } from 'react';
import CircleMinusIcon from '../../icons/CircleMinusIcon';
import ShareIcon from '../../icons/ShareIcon';
import ShareInvitation from '../Share/ShareInvitation';

const CardHeader = () => {
  const [isFocused, setIsFocused] = useState(false);
  const parentRef = useRef<HTMLButtonElement>(null);

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
      <button>
        <CircleMinusIcon />
      </button>
      {/* 청첩장 제목 입력값 */}
      <div className="text-xs font-medium px-2">제목</div>
      <button
        ref={parentRef}
        tabIndex={-1}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className=""
      >
        <ShareIcon />
        {isFocused && (
          <ShareInvitation setIsFocused={setIsFocused} isFocused={isFocused} />
        )}
      </button>
    </div>
  );
};

export default CardHeader;
