import { useRef } from 'react';
import BankSelector from './BankSelector';
import DebouncedInput, {
  DebouncedInputHandle,
} from '@/components/common/DebounceInput/DebounceInput';

const AccountRow = ({
  label,
  accountInfo,
  onUpdate,
}: {
  label: string;
  accountInfo: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    kakaoUrl: string;
  };
  onUpdate: (field: keyof typeof accountInfo, value: string) => void;
}) => {
  const accountNumberInputRef = useRef<DebouncedInputHandle>(null);
  const accountNameInputRef = useRef<DebouncedInputHandle>(null);
  const accountKakaoInputRef = useRef<DebouncedInputHandle>(null);
  return (
    <div className="flex flex-col gap-2 px-2 my-10">
      {/*은행 선택 드롭다운 / 예금주 입력 */}
      <div className="flex items-center gap-2">
        <label className="label">{label}</label>
        <BankSelector
          selectedBank={accountInfo?.bankName}
          onSelect={(bankName) => onUpdate('bankName', bankName)}
        />
        {/* <input
          type="text"
          placeholder="예금주"
          value={accountInfo?.accountHolderName}
          onChange={(e) => onUpdate('accountHolderName', e.target.value)}
          className="formInput"
        /> */}
        <DebouncedInput
          type="text"
          ref={accountNameInputRef}
          value={accountInfo?.accountHolderName}
          onDebouncedChange={(value) => onUpdate('accountHolderName', value)}
          placeholder="예금주"
          className="formInput"
        />
      </div>

      {/*계좌번호*/}
      <div className="flex items-center gap-2">
        <label className="label"></label>
        {/* <input
          type="text"
          placeholder="계좌번호"
          value={accountInfo?.accountNumber}
          onChange={(e) => onUpdate('accountNumber', e.target.value)}
          className="formInput"
        /> */}
        <DebouncedInput
          type="text"
          ref={accountNumberInputRef}
          value={accountInfo?.accountHolderName}
          onDebouncedChange={(value) => onUpdate('accountNumber', value)}
          placeholder="계좌번호"
          className="formInput"
        />
      </div>

      {/*카카오 송금 QR 링크*/}
      <div className="flex items-center gap-2">
        <label className="label"></label>
        {/* <input
          type="text"
          placeholder="카카오 송금 QR 링크"
          value={accountInfo?.kakaoUrl}
          onChange={(e) => onUpdate('kakaoUrl', e.target.value)}
          className="formInput"
        /> */}
        <DebouncedInput
          type="text"
          ref={accountKakaoInputRef}
          value={accountInfo?.accountHolderName}
          onDebouncedChange={(value) => onUpdate('kakaoUrl', value)}
          placeholder="카카오 송금 QR 링크"
          className="formInput"
        />
      </div>
    </div>
  );
};

export default AccountRow;
