import React from 'react';

type HeaderProps = {
  text?: string | React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  fixed?: boolean;
  height?: string;
};

const Header: React.FC<HeaderProps> = ({ text, leftButton, rightButton }) => {
  return (
    <div className='flex items-center w-full max-w-md justify-between'>
      {/* Left Button */}
      <div className='px-4'>{leftButton}</div>

      {/* Text */}
      <div>
        {text}
      </div>

      {/* Right Button */}
      <div className='px-4'>{rightButton}</div>
    </div>
  );
};

export default Header;
