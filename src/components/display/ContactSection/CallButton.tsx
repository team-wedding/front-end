import React from 'react';
import PhoneIcon from '../../icons/PhoneIcon';

interface CallButtonProps {
  phoneNumber: string;
}

const CallButton: React.FC<CallButtonProps> = ({ phoneNumber }) => {
  const handleCall = () => {
    window.location.href = `tel: ${phoneNumber}`;
  };

  return (
    <button onClick={handleCall}>
      <PhoneIcon />
    </button>
  );
};

export default CallButton;
