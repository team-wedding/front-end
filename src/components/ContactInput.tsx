import React from 'react';
import useContactStore from './useContactStore';

const ContactInput = () => {
  const contacts = useContactStore((state) => state.contacts);
  const updateContact = useContactStore((state) => state.updateContact);

  return (
    <div>
      {contacts.map((person, index) => (
        <div key={index} className="p-2">
          <div className="flex items-center mb-2">
            <div className="min-w-[70px] text-left font-semibold">
              {person.role}
            </div>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={person.contact}
              onChange={(e) => updateContact(index, 'contact', e.target.value)}
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-5 p-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <div className="min-w-[70px] text-left font-semibold">아버지</div>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={person.fatherContact}
              onChange={(e) =>
                updateContact(index, 'fatherContact', e.target.value)
              }
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-5 p-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <div className="min-w-[70px] text-left font-semibold">어머니</div>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={person.fatherContact}
              onChange={(e) =>
                updateContact(index, 'fatherContact', e.target.value)
              }
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-5 p-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInput;
