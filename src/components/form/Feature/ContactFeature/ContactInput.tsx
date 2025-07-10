import DebouncedInput, {
  DebouncedInputHandle,
} from '@/components/common/DebounceInput/DebounceInput';
import useContactStore from '@store/useContactStore';
import { useRef } from 'react';

const ContactInput = () => {
  const contacts = useContactStore((state) => state.contacts);
  const updateContact = useContactStore((state) => state.updateContact);
  const contactNumberInputRef = useRef<DebouncedInputHandle>(null);
  const contactMotherNumberInputRef = useRef<DebouncedInputHandle>(null);
  const contactfatherNumberInputRef = useRef<DebouncedInputHandle>(null);

  return (
    <>
      {contacts.map((person, index) => (
        <div key={index}>
          <div className="py-3 border-b border-gray-200">
            <label htmlFor={`${person.role}-contact`} className="label">{person.role}</label>
            <DebouncedInput
              type="tel"
              ref={contactNumberInputRef}
              value={person.contact}
              onDebouncedChange={(value) =>
                updateContact(index, 'contact', value)
              }
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              placeholder="010-0000-0000"
              className="formInput"
            />
          </div>

          <div className="py-3 border-b border-gray-200">
            <label htmlFor={`${person.role}-fatherContact`} className="label">아버지</label>
            <DebouncedInput
              type="tel"
              ref={contactfatherNumberInputRef}
              value={person.fatherContact}
              onDebouncedChange={(value) =>
                updateContact(index, 'fatherContact', value)
              }
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              placeholder="010-0000-0000"
              className="formInput"
            />
          </div>

          <div className="py-3">
            <label htmlFor={`${person.role}-motherContact`} className="label">어머니</label>
            <DebouncedInput
              type="tel"
              ref={contactMotherNumberInputRef}
              value={person.motherContact}
              onDebouncedChange={(value) =>
                updateContact(index, 'motherContact', value)
              }
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              placeholder="010-0000-0000"
              className="formInput"
            />
          </div>

          {index < contacts.length - 1 && (
            <div className="px-6 py-3">
              <div className="h-px bg-gray-200"></div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ContactInput;
