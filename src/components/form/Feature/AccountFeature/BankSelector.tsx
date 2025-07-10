import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface BankOption {
  id: string;
  name: string;
}

const banks: BankOption[] = [
  { id: 'nh', name: 'NH농협' },
  { id: 'kakao', name: '카카오뱅크' },
  { id: 'kb', name: 'KB국민' },
  { id: 'toss', name: '토스뱅크' },
  { id: 'woori', name: '우리은행' },
  { id: 'ibk', name: 'IBK기업' },
  { id: 'hana', name: '하나' },
  { id: 'mg', name: '새마을' },
  { id: 'busan', name: '부산' },
  { id: 'im', name: 'iM뱅크(대구)' },
  { id: 'k', name: '케이뱅크' },
  { id: 'shinhyeob', name: '신협' },
  { id: 'postoffice', name: '우체국' },
  { id: 'sc', name: 'SC제일' },
  { id: 'gyeongnam', name: '경남' },
  { id: 'gwangju', name: '광주' },
  { id: 'suhyeob', name: '수협' },
  { id: 'jeonbuk', name: '전북' },
  { id: 'sb', name: '저축은행' },
  { id: 'jeju', name: '제주' },
  { id: 'citi', name: '씨티' },
  { id: 'kdb', name: 'KDB산업' },
];

const BankSelector: React.FC<{
  selectedBank: string;
  onSelect: (bankName: string) => void;
}> = ({ selectedBank, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleSelect = (bank: BankOption) => {
    onSelect(bank.name);
    setIsOpen(false);
  };

  return (
    <div className="w-44 relative">
      <div
        onClick={toggleDropDown}
        className="flex justify-between items-center px-4 py-3 glass-button cursor-pointer text-sm text-slate-600"
      >
        {selectedBank || '은행 선택'}

        <ChevronRight
          className={`w-4 h-4 text-slate-600 transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-[5] w-full mt-2 bg-white rounded-xl max-h-48 px-2 overflow-y-auto">
          {banks.map((bank) => (
            <li
              key={bank.id}
              onClick={() => handleSelect(bank)}
              className="cursor-pointer text-sm text-slate-600 m-2"
            >
              {bank.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BankSelector;
