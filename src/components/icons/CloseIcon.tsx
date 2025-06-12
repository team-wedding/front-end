type Props = {
  className: string;
  strokeWidth?: string;
};

const CloseIcon = ({ className, strokeWidth }: Props) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M6 18 17.94 6M18 18 6.06 6"
    />
  </svg>
);

export default CloseIcon;
