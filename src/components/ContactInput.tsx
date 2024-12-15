import React from 'react';
import { create } from 'zustand';

type ContactInformation = {
  role: '신랑' | '신부';
  contact: string;
  fatherContact: string;
  motherContact: string;
};

type StoreState = {
  contacts: ContactInformation[];
  updateContact: (
    index: number,
    field: keyof ContactInformation,
    value: string,
  ) => void;
};

const useContactStore = create<StoreState>((set) => ({
  contacts: [
    {
      role: '신랑',
      contact: '',
      fatherContact: '',
      motherContact: '',
    },
    {
      role: '신부',
      contact: '',
      fatherContact: '',
      motherContact: '',
    },
  ],
  updateContact: (index, field, value) =>
    set((state) => {
      const updatedContacts = [...state.contacts];
      updatedContacts[index] = { ...updatedContacts[index], [field]: value };
      return { contacts: updatedContacts };
    }),
}));

const ContactInput = () => {
  const contacts = useContactStore((state) => state.contacts);
  const updateContact = useContactStore((state) => state.updateContact);
  const handleSubmit = () => {
    alert('저장 완료');
  };

  return (
    <div>
      {contacts.map((person, index) => (
        <div key={index}>
          <div>
            <label>
              {person.role}:
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.contact}
                onChange={(e) =>
                  updateContact(index, 'contact', e.target.value)
                }
              />
            </label>
            {person.contact && (
              <div>
                <a href={`tel:${person.contact}`}>
                  <button>전화</button>
                </a>
                <a href={`sms:${person.contact}`}>
                  <button>문자</button>
                </a>
              </div>
            )}
          </div>
          <div>
            <label>
              아버지:
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.fatherContact}
                onChange={(e) =>
                  updateContact(index, 'fatherContact', e.target.value)
                }
              />
            </label>
            {person.fatherContact && (
              <div>
                <a href={`tel:${person.fatherContact}`}>
                  <button>전화</button>
                </a>
                <a href={`sms:${person.fatherContact}`}>
                  <button>문자</button>
                </a>
              </div>
            )}
          </div>
          <div>
            <label>
              어머니:
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={person.motherContact}
                onChange={(e) =>
                  updateContact(index, 'motherContact', e.target.value)
                }
              />
            </label>
            {person.motherContact && (
              <div>
                <a href={`tel:${person.motherContact}`}>
                  <button>전화</button>
                </a>
                <a href={`sms:${person.motherContact}`}>
                  <button>문자</button>
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>저장하기</button>
    </div>
  );
};

export default ContactInput;
