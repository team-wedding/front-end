import useAccountStore from '@store/useAccountStore';
import AccountRow from './AccountRow';

const AccountInput = () => {
  const accounts = useAccountStore((state) => state.accounts);
  const updateAccountInfo = useAccountStore((state) => state.updateAccountInfo);

  return (
    <div>
      {/* 안내문 추가 */}
      <div className="max-w-lg mx-auto p-4 text-[10px] text-gray-500">
        <div className="flex items-start gap-1 mb-1">
          <span className="text-gray-600">ⓘ</span>
          <span>축의금 기능에서 사용되는 정보입니다.</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="text-gray-600">ⓘ</span>
          <span>
            입력한 계좌번호만 노출되며, 카카오 송금 QR은 선택 사항입니다.
          </span>
        </div>
      </div>

      <hr className="mb-5 border-gray-300" />

      {accounts.map((person, index) => (
        <div key={index} className="max-w-lg mx-auto p-4">
          {/* 신랑/신부 정보 */}
          <AccountRow
            label={person.role}
            accountInfo={person.accountInfo}
            onUpdate={(field, value) =>
              updateAccountInfo(index, 'accountInfo', {
                ...person.accountInfo,
                [field]: value,
              })
            }
          />

          {/* 아버지 정보 */}
          <AccountRow
            label="아버지"
            accountInfo={person.fatherAccountInfo}
            onUpdate={(field, value) =>
              updateAccountInfo(index, 'fatherAccountInfo', {
                ...person.fatherAccountInfo,
                [field]: value,
              })
            }
          />

          {/* 어머니 정보 */}
          <AccountRow
            label="어머니"
            accountInfo={person.motherAccountInfo}
            onUpdate={(field, value) =>
              updateAccountInfo(index, 'motherAccountInfo', {
                ...person.motherAccountInfo,
                [field]: value,
              })
            }
          />

          <hr className="mt-8 border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default AccountInput;
