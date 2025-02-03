import useContactStore from '@store/useContactStore';

const ContactInput = () => {
  const contacts = useContactStore((state) => state.contacts);
  const updateContact = useContactStore((state) => state.updateContact);

  return (
    <div>
      {contacts.map((person, index) => (
        <div key={index} className="max-w-lg mx-auto p-3 my-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <label className="label">{person.role}</label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.contact}
                onChange={(e) =>
                  updateContact(index, 'contact', e.target.value)
                }
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                className="formInput"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="label">아버지</label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.fatherContact}
                onChange={(e) =>
                  updateContact(index, 'fatherContact', e.target.value)
                }
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                className="formInput"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="label">어머니</label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.motherContact}
                onChange={(e) =>
                  updateContact(index, 'motherContact', e.target.value)
                }
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                className="formInput"
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
