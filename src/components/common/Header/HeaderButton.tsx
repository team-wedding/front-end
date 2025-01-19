

type HeaderButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const HeaderButton = ({
  children,
  onClick,
  className = '',
}: HeaderButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default HeaderButton;
