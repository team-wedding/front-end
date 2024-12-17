import React from 'react';

type HeaderButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default HeaderButton;
