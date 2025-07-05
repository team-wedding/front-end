import useAccountStore from '@/store/OptionalFeature/useAccountFeatureStore';
import AccountRow from './AccountRow';

const AccountInput = () => {
  const accounts = useAccountStore((state) => state.accounts);
  const updateAccountInfo = useAccountStore((state) => state.updateAccountInfo);

  return (
    <div>
      {accounts.map((person, index) => (
        <div key={index}>
          <div className="border-b border-gray-200 py-3">
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
          </div>

          <div className="border-b border-gray-200 py-3">
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
          </div>

          <div className="py-3">
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
          </div>

          {index < accounts.length - 1 && (
            <div className="px-6 py-3">
              <div className="h-px bg-gray-200"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccountInput;
