import React, { useState } from 'react';
import DaumPost from './DaumPost';
import useAddressStore from '../../../../store/useAddressStore';

const AddressInput: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const { address, zonecode, weddingHallName, weddingHallDetail, setWeddingHallName, setWeddingHallDetail } = useAddressStore();

  // 팝업 열고 닫기
  const handleComplete = () => {
    setPopup(!popup);
  };


  return (
    <div className="max-w-lg mx-auto p-4">
      {/* 주소 입력 폼 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={zonecode}
            placeholder="우편번호"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus-visible:ring-0 focus:ring-primary focus:border-primary flex-1 placeholder:opacity-50"
            readOnly
          />
          <button
            onClick={handleComplete}
            className="bg-rose-300 hover:bg-rose-200 text-gray-800 px-4 py-2 rounded-xl shrink-0 text-xs"
          >
            검색
          </button>
        </div>
        <div className="flex items-center">
          <label className="label">기본 주소</label>
          <input
            type="text"
            value={address}
            placeholder="기본 주소"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus-visible:ring-0 focus:ring-primary focus:border-primary flex-1 placeholder:opacity-50"
            readOnly
          />
        </div>
        {/* 예식장명 */}
        <div className="flex items-center">
          <label className="label">예식장명</label>
          <input
            type="text"
            value={weddingHallName}
            placeholder="예식장 이름"
            className="formInput"
            maxLength={36}
            onChange={(e) => setWeddingHallName(e.target.value)}
          />
        </div>
        {/* 층과 홀 */}
        <div className="flex items-center">
          <label className="label">층과 홀</label>
          <input
            type="text"
            value={weddingHallDetail}
            placeholder="층과 웨딩홀 이름"
            className="formInput"
            minLength={2}
            maxLength={36}
            onChange={(e) => setWeddingHallDetail(e.target.value)}
          />
        </div>
      </div>
      {/* DaumPost 팝업 */}
      {popup && <DaumPost handleComplete={handleComplete} />}
    </div>
  );
};

export default AddressInput;
