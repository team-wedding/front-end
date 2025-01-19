import Contact from './Contact';
import useContactStore from '../../../store/useContactStore';
import ContactTitle from './ContactTitle';

const ContactSection = () => {
  const contacts = useContactStore((state) => state.contacts);

  // 신랑 및 신부 정보
  const groom = contacts.find((person) => person.role === '신랑');
  const bride = contacts.find((person) => person.role === '신부');

  return (
    <div className="column-center gap-6">
      <ContactTitle />
      <div className="column-center gap-5 mb-10 text-sm">
        <Contact title="신랑에게 연락하기" phoneNumber={groom?.contact} />
        <Contact title="신부에게 연락하기" phoneNumber={bride?.contact} />
      </div>

      <div className="column-center gap-10 text-xs">
        <div className="text-gray-500">혼주에게 연락하기</div>
        <div className="flex-center gap-20 ">
          <div className="contact-group">
            <div className="text-sky-400 ">신랑측 혼주</div>
            <Contact title="아버지" phoneNumber={groom?.fatherContact} />
            <Contact title="어머니" phoneNumber={groom?.motherContact} />
          </div>
          <div className="contact-group">
            <div className="text-pink-400">신부측 혼주</div>
            <Contact title="아버지" phoneNumber={bride?.fatherContact} />
            <Contact title="어머니" phoneNumber={bride?.motherContact} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
