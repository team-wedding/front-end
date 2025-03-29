import { IconProps } from '../../types/icons';

const ChevronRight = ({ className }: IconProps) => (
  <svg
    className={`size-6  ${className}`}
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
      strokeWidth="1.5"
      d="m10 16 4-4-4-4"
    />
  </svg>
);

export default ChevronRight;
