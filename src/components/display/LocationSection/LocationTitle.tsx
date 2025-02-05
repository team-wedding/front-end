import useAddressStore from '@store/useAddressStore';
import CopyToClipboard from 'react-copy-to-clipboard';
import FileCopyIcon from '@icons/FileCopyIcon';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastPopup from '@/components/common/Toastpopup';
import { useState } from 'react';

const LocationTitle = () => {
  // 웨딩 이름, 층, 홀 추가하기
  const { jibunAddress } = useAddressStore();

  const addressToCopy = jibunAddress || '서울 강남구 언주로 564';

  const [toast, setToast] = useState(false);

  const handleCopy = () => {
    // toast.success('클립보드에 복사되었어요!', {
    //   position: 'bottom-center',
    //   autoClose: 2000,
    //   hideProgressBar: true,
    // });
    setToast(true);
  };

  return (
    <div className="column-center gap-2 my-10">
      <div className="sub-title">LOCATION</div>
      <div className="title">오시는 길</div>
      <div className="font-normal"> 더라움 1층 1홀</div>
      <div className="flex-center gap-2 opacity-80 text-sm">
        {addressToCopy}
        <CopyToClipboard text={addressToCopy} onCopy={handleCopy}>
          <button>
            <FileCopyIcon />
          </button>
        </CopyToClipboard>
      </div>
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
};

export default LocationTitle;
