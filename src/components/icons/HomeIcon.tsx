import React from 'react';
interface IconActive {
  active: boolean;
}
const ShareIcon: React.FC<IconActive> = ({ active }) => (
  <svg
    className={`size-6 text-gray-800 dark:text-white hover:text-primary  ${active && 'text-primary'}`}
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
      strokeWidth="2"
      d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
    />
  </svg>
);

export default ShareIcon;
