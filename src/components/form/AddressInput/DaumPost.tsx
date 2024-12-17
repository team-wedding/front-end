import React from 'react';
import DaumPostcode from 'react-daum-postcode';

interface PostCode {
  address: string;
  zonecode: string | number;
}

interface PostcodeData {
  address: string;
  zonecode: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

interface DaumPostProps {
  address: PostCode; // 부모로부터 받은 주소 상태
  setAddress: React.Dispatch<React.SetStateAction<PostCode>>; // 상태 업데이트 함수
  handleComplete: () => void; // 팝업 닫기 함수
}

const DaumPost: React.FC<DaumPostProps> = ({ setAddress, handleComplete }) => {
  // DaumPostcode API 완료 시 실행되는 함수
  const complete = (data: PostcodeData) => {
    let fullAddress = data.address;
    let zonecode = data.zonecode;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log('Selected Data:', data);
    console.log('Full Address:', fullAddress);
    console.log('Zonecode:', data.zonecode);

    // 부모 상태 업데이트
    setAddress({
      address: fullAddress,
      zonecode: zonecode,
    });

    // 팝업 닫기
    handleComplete();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      {/* 팝업 컨테이너 */}
      <div className="relative bg-white rounded-lg shadow-lg w-[500px]">
        {/* 헤더 */}
        <div className="flex justify-between items-center px-4 py-3 bg-gray-800 rounded-t-lg">
          <h1 className="text-white text-lg font-bold">예식 장소 주소 검색</h1>
          <i
            className="bx bx-x text-2xl text-white cursor-pointer hover:text-gray-300"
            onClick={handleComplete}
          ></i>
        </div>

        {/* DaumPostcode 컴포넌트 */}
        <div className="p-4">
          <DaumPostcode
            autoClose
            onComplete={complete}
            style={{ width: '100%', height: '400px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default DaumPost;
