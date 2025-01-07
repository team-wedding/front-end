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
    <header className="flex items-center w-full max-w-sm justify-between px-8">
      {/* Left Button */}
      <div className="flex-1 flex justify-start">{leftButton}</div>

      {/* Text */}
      <div
        className={`flex-1 text-center ${
          leftButton || rightButton ? '' : 'justify-center'
        }`}
      >
        {text}
      </div>

      {/* Right Button */}
      <div className="flex-1 flex justify-end">{rightButton}</div>
    </header>
  );
};

export default Header;
