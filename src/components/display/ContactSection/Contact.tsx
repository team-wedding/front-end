
import CallButton from './CallButton';

interface ContactProps {
  title: string;
  phoneNumber: string | undefined;
}

const Contact = ({ title, phoneNumber }: ContactProps) => {
  return (
    <div className="flex gap-2">
      <div>{title}</div>
      {phoneNumber && <CallButton phoneNumber={phoneNumber} />}
    </div>
  );
};

export default Contact;
