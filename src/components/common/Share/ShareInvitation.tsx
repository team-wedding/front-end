import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
// import LinkIcon from '@icons/LinkIcon';
import Toast from '@/components/common/Toast';
import useToast from '@/hooks/useToast';

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

  const { message, showToast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `https://www.woogyeol.site/${shareUrl}`,
    );
    showToast('클립보드에 복사되었습니다.');
  };

  return (
    <>
      <div
        className={`${isFocused ? 'max-h-60' : 'max-h-0 invisible'} absolute flex flex-col bottom-12 right-6 items-center bg-black/80 p-2 rounded-xl text-xs font-medium text-white/80 transition-all duration-500 ease-in-out backdrop-blur-3xl`}
        onBlur={() => setIsFocused(false)}
      >
        <button
          onClick={handleCopy}
          className="px-3 py-3 flex flex-row items-center"
        >
          {/* <LinkIcon /> */}
          URL 복사하기
        </button>
        <hr className="w-full" />
        <button onClick={handleKakaoShare} className="px-3 py-3">
          카카오로 공유하기
        </button>
        <hr className="w-full" />
        <QRCodeCanvas
          ref={canvas}
          className="hidden"
          id={'qr-code-download'}
          value={`https://www.woogyeol.site/${shareUrl}`}
        />
        <a href={pngUrl} download={'qr.png'} className="px-3 py-3" ref={aRef}>
          QR 코드 저장
        </a>
      </div>

      {message && <Toast key={message} message={message} />}
    </>
  );
}
