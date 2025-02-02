import PhoneIcon from '@icons/PhoneIcon';

interface CallButtonProps {
  phoneNumber: string;
  role: string;
}

const CallButton = ({ phoneNumber, role }: CallButtonProps) => {
  const handleCall = () => {
    window.location.href = `tel: ${phoneNumber}`;
  };

  return (
    <button onClick={handleCall} className="hover:opacity-50">
      {role === '신랑' ? (
        <PhoneIcon className="text-sky-300" />
      ) : (
        <PhoneIcon className="text-pink-300" />
      )}
    </button>
  );
};

export default CallButton;
