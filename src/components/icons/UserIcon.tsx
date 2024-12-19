
import React from 'react';
interface IconActive {
  active: boolean
}
const UserIcon: React.FC<IconActive> = ({ active }) => (
  <svg className={`size-8 text-gray-800 dark:text-white hover:text-primary  ${active && "text-primary"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg >


);

export default UserIcon;