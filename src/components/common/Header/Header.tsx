type HeaderProps = {
  text?: string | React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  fixed?: boolean;
  height?: string;
};

const Header = ({ text, leftButton, rightButton }: HeaderProps) => {
  return (
    <div className="flex items-center w-full max-w-md justify-between">
      {/* Left Button */}
      <div className="mx-8">{leftButton}</div>

      {/* Text */}
      <div>{text}</div>

      {/* Right Button */}
      <div className="mx-8">{rightButton}</div>
    </div>
  );
};

export default Header;
