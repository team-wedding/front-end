import DaumPostcode from 'react-daum-postcode';
import useAddressStore from '@store/useAddressStore';

interface PostcodeData {
  address: string;
  jibunAddress: string;
  zonecode: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

interface DaumPostProps {
  handleComplete: () => void; // 팝업 닫기 함수
}

const DaumPost = ({ handleComplete }: DaumPostProps) => {
  const setAddress = useAddressStore((state) => state.setAddress);
  const setJibunAddress = useAddressStore((state) => state.setJibunAddress);

  // DaumPostcode API 완료 시 실행되는 함수
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

    console.log('Selected Data:', data);
    console.log('Full Address:', fullAddress);
    console.log('Zonecode:', data.zonecode);

    // 부모 상태 업데이트
    setAddress(fullAddress, zonecode);
    setJibunAddress(jibunAddress);

    // 팝업 닫기
    handleComplete();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* 팝업 컨테이너 */}
      <div className="relative bg-white rounded-lg shadow-lg w-[400px] mx-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center px-6 py-3 bg-gray-800 rounded-t-lg">
          <h1 className="text-white font-semibold opacity-90">
            예식 장소 주소 검색
          </h1>
          <i
            className="bx bx-x text-xl text-white cursor-pointer hover:text-gray-300"
            onClick={handleComplete}
          ></i>
        </div>

        {/* DaumPostcode 컴포넌트 */}
        <div className="p-4">
          <DaumPostcode
            autoClose
            onComplete={complete}
            style={{ height: '300px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default DaumPost;
