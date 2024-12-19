import React from 'react';

type HeaderProps = {
  text?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  fixed?: boolean;
  height?: string;
};

const Header: React.FC<HeaderProps> = ({ text, leftButton, rightButton }) => {
  return (
    <header className="flex items-center w-full max-w-sm justify-between px-8">
      {leftButton}
      <div className="text-base font-medium">{text}</div>
      {rightButton}
    </header>
  );
};

export default Header;
