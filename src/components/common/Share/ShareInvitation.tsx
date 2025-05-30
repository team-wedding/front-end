import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
// import { toast, ToastContainer } from 'react-toastify';
import LinkIcon from '@icons/LinkIcon';
import ToastPopup from '../ToastPopup';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

interface ShareProp {
  isFocused: boolean;
  shareTitle: string;
  shareDesc: string;
  shareImage: string;
  shareUrl: string;
  shareHeader: string;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}

export default function ShareInvitation({
  isFocused,
  shareDesc,
  shareHeader,
  shareImage,
  shareUrl,
  shareTitle,
  setIsFocused,
}: ShareProp) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const aRef = useRef(null);
  const [pngUrl, setPngUrl] = useState('');

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
        THU: shareImage,
        headerShare: shareHeader,
        title: shareTitle,
        desc: shareDesc,
        url: shareUrl,
      },
    });
  };

  const [toast, setToast] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `https://woogyeol.vercel.app/${shareUrl}`,
    );
    setToast(true);
  };

  return (
    <div
      className={`${isFocused ? 'max-h-40' : 'max-h-0 invisible'} absolute flex flex-col bottom-9 right-6 items-center bg-black/80 px-1 rounded-xl text-[9px] text-white/90 transition-all duration-500 ease-in-out backdrop-blur-3xl`}
      onBlur={() => setIsFocused(false)}
    >
      <button
        onClick={handleCopy}
        className="px-3 py-3 flex flex-row items-center"
      >
        <LinkIcon />
        URL 공유하기
      </button>
      <hr className=" w-full" />
      <button onClick={handleKakaoShare} className="px-3 py-3">
        카카오로 공유하기
      </button>
      <hr className=" w-full" />
      <QRCodeCanvas
        ref={canvas}
        className="hidden"
        id={'qr-code-download'}
        value={`https://woogyeol.vercel.app/${shareUrl}`}
      />
      <a href={pngUrl} download={'qr.png'} className="px-3 py-3" ref={aRef}>
        QR 코드 저장
      </a>
      {/* <ToastContainer /> */}
      {toast && (
        <ToastPopup
          setToast={setToast}
          message={'클립보드에 복사되었어요.'}
          position="bottom"
        />
      )}
    </div>
  );
}
