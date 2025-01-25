import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast, ToastContainer } from 'react-toastify';
import LinkIcon from '../../icons/LinkIcon';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

interface ShareProp {
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}

export default function ShareInvitation({
  isFocused,
  setIsFocused,
}: ShareProp) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const aRef = useRef(null);
  const [pngUrl, setPngUrl] = useState('');

  let mock_Title = 'title is here';
  let mock_Desc = 'description is here';
  let mock_Image =
    ' https://images.pexels.com/photos/29554688/pexels-photo-29554688/free-photo-of-romantic-wedding-couple-in-urban-tel-aviv-setting.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  let mock_Url = 'result';
  let mock_Header = 'ㅇㅇㅇ 💌 ㅇㅇㅇ';

  useEffect(() => {
    if (window && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
        console.log(window.Kakao.isInitialized());
      }
    }
    if (canvas && canvas.current) {
      if (canvas.current instanceof HTMLCanvasElement) {
        setPngUrl(
          canvas.current
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream'),
        );
      }
    }
  }, []);

  const handleKakaoShare = () => {
    window.Kakao.Share.sendCustom({
      templateId: 116215,
      templateArgs: {
        THU: mock_Image,
        headerShare: mock_Header,
        title: mock_Title,
        desc: mock_Desc,
        url: mock_Url,
      },
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText('http://localhost:5173/');
    toast.success('클립보드에 복사되었습니다 😀', {
      className: 'bottom: 8rem',
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
    });
    // setIsFocused(false)
  };

  return (
    <div
      className={`${isFocused ? 'max-h-40' : 'max-h-0 invisible'} absolute flex flex-col top-5 right-2 items-center bg-[#3A3A3A] px-2 rounded-lg text-[8px]   transition-all duration-500 ease-in-out`}
      onBlur={() => setIsFocused(false)}
    >
      <button
        onClick={handleCopy}
        className="px-3 py-4 flex flex-row items-center"
      >
        <LinkIcon />
        URL 공유하기
      </button>
      <hr className=" w-full" />
      <button onClick={handleKakaoShare} className="px-3 py-4">
        {' '}
        카카오로 공유하기
      </button>
      <hr className=" w-full" />
      <QRCodeCanvas
        ref={canvas}
        className="hidden"
        id={'qr-code-download'}
        value={`http://localhost:5173/`}
      />
      <a href={pngUrl} download={'qr.png'} className="px-3 py-4" ref={aRef}>
        QR 코드 저장
      </a>
      <ToastContainer />
    </div>
  );
}
