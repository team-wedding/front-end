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
    <div>
      {contacts.map((person, index) => (
        <div key={index} className="max-w-lg mx-auto p-3 my-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor={`${person.role}-contact`} className="label">
                {person.role}
              </label>
              {/* <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.contact}
                onChange={(e) =>
                  updateContact(index, 'contact', e.target.value)
                }
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                className="formInput"
              /> */}
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
                id={`${person.role}-contact`}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor={`${person.role}-fatherContact`} className="label">
                아버지
              </label>
              {/* <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.fatherContact}
                onChange={(e) =>
                  updateContact(index, 'fatherContact', e.target.value)
                }
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                className="formInput"
              /> */}
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
                id={`${person.role}-fatherContact`}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor={`${person.role}-motherContact`} className="label">
                어머니
              </label>
              {/* <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.motherContact}
                onChange={(e) =>
                  updateContact(index, 'motherContact', e.target.value)
                }
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                className="formInput"
              /> */}
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
                id={`${person.role}-motherContact`}
              />
            </div>

            <hr className="mt-8" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInput;
