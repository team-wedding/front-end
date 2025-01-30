import { useState } from 'react';
import AccountNumberItem from '@common/AccountNumberItem/AccountNumberItem';
import useAccountStore from '@store/useAccountStore';

const MoneySection = () => {
  const { accounts } = useAccountStore();
  const [accordionStates, setAccordionStates] = useState({
    groom: false,
    bride: false,
  });
  const toggleAccordion = (key: 'groom' | 'bride') => {
    setAccordionStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <div className="column-center w-full flex flex-col gap-4 h-fit">
      <div className="font-semibold text-xl">마음 전하실곳 </div>
      {accounts.map((value, index) => {
        const { accountInfo, motherAccountInfo, fatherAccountInfo } = value;
        const isOpen =
          value.role === '신랑님'
            ? accordionStates.groom
            : accordionStates.bride;
        const accountEmpty = accountInfo
          ? Object.values(accountInfo).every((value) => value === '')
          : true;
        const mothreAccountEmpty = motherAccountInfo
          ? Object.values(motherAccountInfo).every((value) => value === '')
          : true;
        const fatherAccountEmpty = fatherAccountInfo
          ? Object.values(fatherAccountInfo).every((value) => value === '')
          : true;
        const allEmpty =
          accountEmpty && mothreAccountEmpty && fatherAccountEmpty;
        return (
          <section className="flex flex-col w-72" key={index}>
            {!allEmpty && (
              <>
                <div
                  className={`flex py-2 px-5 cursor-default justify-between items-center bg-secondary rounded-lg ${isOpen && 'rounded-b-none'
                    }`}
                  onClick={() =>
                    toggleAccordion(value.role === '신랑님' ? 'groom' : 'bride')
                  }
                >
                  <div className="font-medium">{`${value.role} 계좌번호`}</div>
                  <i
                    className={`bx bx-chevron-down text-xl transition-all duration-300 ${isOpen ? 'rotate-180' : ''
                      }`}
                  ></i>
                </div>
                <div
                  className={`overflow-hidden transition-all ${isOpen ? 'h-fit' : 'h-0'
                    }`}
                >
                  {!accountEmpty && (
                    <AccountNumberItem
                      bank={accountInfo.bankName}
                      accountNumber={accountInfo.accountNumber}
                      name={accountInfo.accountHolderName}
                      kakaoLink={accountInfo.kakaoUrl}
                    />
                  )}
                  {!fatherAccountEmpty && (
                    <AccountNumberItem
                      bank={fatherAccountInfo.bankName}
                      accountNumber={fatherAccountInfo.accountNumber}
                      name={fatherAccountInfo.accountHolderName}
                      kakaoLink={fatherAccountInfo.kakaoUrl}
                    />
                  )}
                  {!mothreAccountEmpty && (
                    <AccountNumberItem
                      bank={motherAccountInfo.bankName}
                      accountNumber={motherAccountInfo.accountNumber}
                      name={motherAccountInfo.accountHolderName}
                      kakaoLink={motherAccountInfo.kakaoUrl}
                      last={true}
                    />
                  )}
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default MoneySection;
