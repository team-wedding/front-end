import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import ContactInput from './ContactInput';

const ContactFeature = () => {
  return (
    <div className="mx-4">
      <InformationItem messages={['입력한 연락처만 노출됩니다.']} />
      <hr />
      <ContactInput />
    </div>
  );
};

export default ContactFeature;
