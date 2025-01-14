import React, { useState } from "react";

interface BankOption {
    id: string;
    name: string;
}

const banks: BankOption[] = [
    { id: "nh", name: "NH농협" },
    { id: "kakao", name: "카카오뱅크" },
    { id: "kb", name: "KB국민" },
    { id: "toss", name: "토스뱅크" },
    { id: "woori", name: "우리은행" },
    { id: "ibk", name: "IBK기업" },
    { id: "hana", name: "하나" },
    { id: "mg", name: "새마을" },
    { id: "busan", name: "부산" },
    { id: "im", name: "iM뱅크(대구)" },
    { id: "k", name: "케이뱅크" },
    { id: "shinhyeob", name: "신협" },
    { id: "postoffice", name: "우체국" },
    { id: "sc", name: "SC제일" },
    { id: "gyeongnam", name: "경남" },
    { id: "gwangju", name: "광주" },
    { id: "suhyeob", name: "수협" },
    { id: "jeonbuk", name: "전북" },
    { id: "sb", name: "저축은행" },
    { id: "jeju", name: "제주" },
    { id: "citi", name: "씨티" },
    { id: "kdb", name: "KDB산업" },
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
        <div className="relative w-28">

            <div onClick={toggleDropDown}
                className="flex justify-between items-center px-3 py-2 border border-gray-300 rounded-xl bg-white cursor-pointer text-xs hover:bg-gray-100 gap-1">
                {selectedBank || "은행 선택"}
                <i
                    className={`bx bx-chevron-down text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                ></i>
            </div>
            {isOpen && (
                <ul className="absolute z-10 w-28 mt-2 bg-white border border-gray-300 rounded-xl max-h-36 overflow-y-auto">
                    {banks.map((bank) => (
                        <li
                            key={bank.id}
                            onClick={() => handleSelect(bank)}
                            className="cursor-pointer text-xs m-2"
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