import { toast } from 'react-toastify';
import kakaoPay from '@assets/kakao_pay_icon.png';

interface BankProps {
  bank: string;
  accountNumber: string;
  name: string;
  kakaoLink?: string;
  last?: boolean;
}

export default function AccountNumberItem({
  bank,
  accountNumber,
  name,
  kakaoLink,
  last,
}: BankProps) {
  const handleAccountNumCopy = async () => {
    await navigator.clipboard.writeText(accountNumber);
    toast.success('계좌번호가 저장되었습니다. 😀', {
      className: 'bottom: 8rem',
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
    });
  };
  const handleKakaoNumCopy = async () => {
    await navigator.clipboard.writeText(kakaoLink!);
    toast.success('카카오페이가 저장되었습니다 😀', {
      className: 'bottom: 8rem',
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
    });
  };
  return (
    <div
      className={`flex justify-between items-center border-b p-6 text-xs ${last && 'rounded-b-md'}`}
    >
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex flex-col gap-1">
          <div>{bank}</div>
          <div className="text-neutral-400">{accountNumber}</div>
        </div>
        <div>{name}</div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {accountNumber !== '' && (
          <button
            onClick={handleAccountNumCopy}
            className="flex items-center border border-gray-400  shadow-sm h-6 px-2 bg-white rounded-full text-[10px] hover:bg-gray-200"
          >
            복사하기
          </button>
        )}
        {kakaoLink !== '' && (
          <button
            className="flex hover:opacity-70 "
            onClick={handleKakaoNumCopy}
          >
            <img
              className="w-[52px] shadow-sm rounded-full border border-gray-400"
              src={kakaoPay}
            />
          </button>
        )}
      </div>
    </div>
  );
}
