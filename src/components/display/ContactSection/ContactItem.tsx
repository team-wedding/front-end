import CallButton from './CallButton';

interface ContactItemProps {
  title: string;
  phoneNumber: string | undefined;
  role: string;
}

const ContactItem = ({ title, phoneNumber, role }: ContactItemProps) => {
  return (
    <div className="flex gap-2">
      <div>{title}</div>
      {phoneNumber && <CallButton phoneNumber={phoneNumber} role={role} />}
    </div>
  );
};

export default ContactItem;
