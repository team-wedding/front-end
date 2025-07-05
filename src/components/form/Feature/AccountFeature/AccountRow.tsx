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
    <>
      <label className="label">{label}</label>

      <div className="flex">
        <label className="label"></label>
        <DebouncedInput
          type="text"
          ref={accountNameInputRef}
          value={accountInfo?.accountHolderName}
          onDebouncedChange={(value) => onUpdate('accountHolderName', value)}
          placeholder="예금주"
          className="formInput"
        />
        <BankSelector
          selectedBank={accountInfo?.bankName}
          onSelect={(bankName) => onUpdate('bankName', bankName)}
        />
      </div>

      <label className="label"></label>
      <DebouncedInput
        type="text"
        ref={accountNumberInputRef}
        value={accountInfo?.accountHolderName}
        onDebouncedChange={(value) => onUpdate('accountNumber', value)}
        placeholder="계좌번호"
        className="formInput"
      />

      <label className="label"></label>
      <DebouncedInput
        type="text"
        ref={accountKakaoInputRef}
        value={accountInfo?.accountHolderName}
        onDebouncedChange={(value) => onUpdate('kakaoUrl', value)}
        placeholder="카카오 송금 QR 링크"
        className="formInput"
      />
    </>
  );
};

export default AccountRow;
