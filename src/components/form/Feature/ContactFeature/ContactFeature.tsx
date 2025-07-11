import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import ContactInput from './ContactInput';

const ContactFeature = () => {
  return (
    <>
      <InformationItem messages={['입력한 연락처만 노출됩니다.']} />
      <ContactInput />
    </>
  );
};

export default ContactFeature;
