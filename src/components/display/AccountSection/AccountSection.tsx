import { useState } from 'react';
import AccountNumberItem from '@common/AccountNumberItem/AccountNumberItem';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import SectionTitle from '@/components/common/SectionTitle';
import useAccountStore from '@/store/OptionalFeature/useAccountFeatureStore';

const AccountSection = () => {
  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const { accounts } = useAccountStore();
  const [accordionStates, setAccordionStates] = useState({
    groom: false,
    bride: false,
  });
  const toggleAccordion = (key: 'groom' | 'bride') => {
    setAccordionStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isAccountFeatureActive = selectedOptionalFeatures.account;

  return (
    isAccountFeatureActive && (
      <div className="column-center w-full flex flex-col gap-5 py-10">
        <SectionTitle subTitle="ACCOUNT" title="마음 전하실 곳" />
        {accounts.map((value, index) => {
          const { accountInfo, motherAccountInfo, fatherAccountInfo } = value;
          const isOpen =
            value.role === '신랑'
              ? accordionStates.groom
              : accordionStates.bride;
          const accountEmpty = Object.values(accountInfo).every(
            (value) => value === '',
          );
          const mothreAccountEmpty = Object.values(motherAccountInfo).every(
            (value) => value === '',
          );
          const fatherAccountEmpty = Object.values(fatherAccountInfo).every(
            (value) => value === '',
          );
          const allEmpty =
            accountEmpty && mothreAccountEmpty && fatherAccountEmpty;
          return (
            <section className="flex flex-col w-72 text-xs" key={index}>
              {!allEmpty && (
                <>
                  <div
                    className={`flex py-3 px-5  cursor-default justify-between items-center  ${value.role === '신랑' ? 'bg-sky-50 bg-opacity-70' : 'bg-pink-50 bg-opacity-70'} rounded-md ${isOpen && 'rounded-b-none'
                      }`}
                    onClick={() =>
                      toggleAccordion(value.role === '신랑' ? 'groom' : 'bride')
                    }
                  >
                    <div className="font-medium">{`${value.role}측 계좌번호`}</div>
                    <i
                      className={`bx bx-chevron-down text-lg transition-all duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    ></i>
                  </div>
                  <div
                    className={`overflow-hidden transition-all shadow-inner bg-white ${isOpen ? 'h-fit' : 'h-0'
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
    )
  );
};

export default AccountSection;
