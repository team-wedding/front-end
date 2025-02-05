import useAddressStore from '@store/useAddressStore';
import CopyToClipboard from 'react-copy-to-clipboard';
import FileCopyIcon from '@icons/FileCopyIcon';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '@/components/common/SectionTitle';

const LocationTitle = () => {
  const { jibunAddress, weddingHallName, weddingHallDetail } =
    useAddressStore();

  const addressToCopy = jibunAddress || '서울 강남구 언주로 564';

  const handleCopy = () => {
    toast.success('클립보드에 복사되었습니다 😀', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="column-center gap-2 my-10">
      <SectionTitle subTitle="LOCATION" title="오시는 길" />
      <div className="text-lg">{`${weddingHallName} ${weddingHallDetail}`}</div>
      <div className="flex-center gap-2 opacity-80 text-sm">
        {addressToCopy}
        <CopyToClipboard text={addressToCopy} onCopy={handleCopy}>
          <button>
            <FileCopyIcon />
          </button>
        </CopyToClipboard>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LocationTitle;
