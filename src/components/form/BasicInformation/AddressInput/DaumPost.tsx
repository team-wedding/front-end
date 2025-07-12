import DaumPostcode from 'react-daum-postcode';
import useAddressStore from '@store/useAddressStore';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface PostcodeData {
  address: string;
  jibunAddress: string;
  zonecode: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

interface DaumPostProps {
  handleComplete: () => void;
}

const DaumPost = ({ handleComplete }: DaumPostProps) => {
  const setAddress = useAddressStore((state) => state.setAddress);
  const setJibunAddress = useAddressStore((state) => state.setJibunAddress);
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    throw new Error(
      'Modal root element not found. Make sure <div id="modal-root" /> exists in index.html.',
    );
  }

  const complete = (data: PostcodeData) => {
    let fullAddress = data.address;
    let zonecode = data.zonecode;
    let extraAddress = '';

    const jibunAddress = data.jibunAddress || '';

    if (data.addressType === 'R') {
      if (data.bname) {
        extraAddress += data.bname;
      }
      if (data.buildingName) {
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      }
      fullAddress += extraAddress ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress, zonecode);
    setJibunAddress(jibunAddress);

    handleComplete();
  };

  return createPortal(
    <div className="fixed flex-center inset-0 bg-black/60 z-50">
      <div className="shadow-lg w-96 mx-auto md:w-[500px] transition-all">
        <div className="flex backdrop-blur-xl justify-between items-center px-3 py-3 bg-slate-900/50">
          <h1 className="text-white/90">주소 검색</h1>
          <X
            className="w-5 text-white cursor-pointer"
            onClick={handleComplete}
          />
        </div>

        <DaumPostcode autoClose onComplete={complete} />
      </div>
    </div>,
    modalRoot,
  );
};

export default DaumPost;
