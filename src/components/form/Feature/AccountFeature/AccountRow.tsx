import BankSelector from './BankSelector';

const AccountRow = ({
  label,
  accountInfo,
  onUpdate,
}: {
  label: string;
  accountInfo: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    kakaoPayQRCode: string;
  };
  onUpdate: (field: keyof typeof accountInfo, value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/*은행 선택 드롭다운 / 예금주 입력 */}
      <div className="flex items-center gap-2">
        <label className="label">{label}</label>
        <BankSelector
          selectedBank={accountInfo.bankName}
          onSelect={(bankName) => onUpdate('bankName', bankName)}
        />
        <input
          type="text"
          placeholder="예금주"
          value={accountInfo.accountHolder}
          onChange={(e) => onUpdate('accountHolder', e.target.value)}
          className="formInput"
        />
      </div>

      {/*계좌번호*/}
      <div className="flex items-center gap-2">
        <label className="label"></label>
        <input
          type="text"
          placeholder="계좌번호"
          value={accountInfo.accountNumber}
          onChange={(e) => onUpdate('accountNumber', e.target.value)}
          className="formInput"
        />
      </div>

      {/*카카오 송금 QR 링크*/}
      <div className="flex items-center gap-2">
        <label className="label"></label>
        <input
          type="text"
          placeholder="카카오 송금 QR 링크"
          value={accountInfo.kakaoPayQRCode}
          onChange={(e) => onUpdate('kakaoPayQRCode', e.target.value)}
          className="formInput"
        />
      </div>
    </div>
  );
};

export default AccountRow;
