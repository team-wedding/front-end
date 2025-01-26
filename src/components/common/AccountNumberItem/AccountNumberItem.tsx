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
      className={`flex flex-row justify-between w-full border p-3 text-sm ${last && 'rounded-b-lg'}`}
    >
      <div className="flex flex-col items-start justify-center">
        <div className="flex-wrap">
          <div>{bank}</div>
          {accountNumber}
        </div>
        <div>{name}</div>
      </div>
      <div className="flex flex-col items-start justify-center gap-2 h-full">
        {accountNumber !== '' && (
          <button
            onClick={handleAccountNumCopy}
            className="flex justify-center ring-2 ring-gray-200 w-16 h-7  rounded-2xl text-[13px] leading-7 text-primary  hover:ring-primary "
          >
            복사하기
          </button>
        )}
        {kakaoLink !== '' && (
          <button
            className="flex rounded-2xl ring-2 ring-transparent hover:ring-primary "
            onClick={handleKakaoNumCopy}
          >
            <img className="w-16 h-7" src={kakaoPay} />
          </button>
        )}
      </div>
    </div>
  );
}
