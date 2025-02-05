type HeaderProps = {
  text?: string | React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  fixed?: boolean;
  height?: string;
};

const Header = ({ text, leftButton, rightButton }: HeaderProps) => {
  return (
    <div className="relative flex items-center w-full max-w-md">
      {/* Left Button */}
      <div className="mx-2">{leftButton}</div>

      {/* Text - 중앙 정렬 */}
      <div className="absolute left-1/2 transform -translate-x-1/2">{text}</div>

      {/* Right Button */}
      <div className="mx-2 ml-auto">{rightButton}</div>
    </div>
  );
};

export default Header;
