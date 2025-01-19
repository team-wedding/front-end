
import PhoneIcon from '../../icons/PhoneIcon';

interface CallButtonProps {
  phoneNumber: string;
}

const CallButton = ({ phoneNumber }: CallButtonProps) => {
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
