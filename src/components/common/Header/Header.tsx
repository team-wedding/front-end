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
    <header className="header">
      <div className="container flex items-center justify-center mx-auto relative h-[var(--header-height)]">
        {leftButton && <div className="btn absolute left-4">{leftButton}</div>}
        <div className="text-base font-medium">{text}</div>
        {rightButton && (
          <div className="btn absolute right-4">{rightButton}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
