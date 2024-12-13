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
    alert('저장 로직 작성하기 ~~');
  };

  return (
    <div>
      {contacts.map((person, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div>
            <label>
              {person.role}:
              <input
                type="tel"
                pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                placeholder="010-0000-0000"
                value={person.contact}
                onChange={(e) =>
                  updateContact(index, 'contact', e.target.value)
                }
              />
            </label>
          </div>
          <div>
            <label>
              {person.role} 아버지:
              <input
                type="tel"
                pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                placeholder="010-0000-0000"
                value={person.fatherContact}
                onChange={(e) =>
                  updateContact(index, 'fatherContact', e.target.value)
                }
              />
            </label>
          </div>
          <div>
            <label>
              {person.role} 어머니:
              <input
                type="tel"
                pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                placeholder="010-0000-0000"
                value={person.motherContact}
                onChange={(e) =>
                  updateContact(index, 'motherContact', e.target.value)
                }
              />
            </label>
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>저장하기</button>
    </div>
  );
};

export default ContactInput;
