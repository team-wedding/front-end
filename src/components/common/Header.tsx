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
      <div className="container flex items-center justify-between">
        {leftButton && <div className="btn">{leftButton}</div>}
        <div className="text-base font-medium">{text}</div>
        {rightButton && <div className="btn">{rightButton}</div>}
      </div>
    </header>
  );
};

export default Header;
