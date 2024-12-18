import React, { useState } from 'react';
import DaumPost from './DaumPost';
import useAddressStore from '../../../store/useAddressStore';

const AddressInput: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const { address, zonecode } = useAddressStore();

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
            className="border p-2 rounded"
            readOnly
          />
          <button
            onClick={handleComplete}
            className="bg-primary hover:bg-pink-600 text-white px-4 py-2 rounded"
          >
            검색
          </button>
        </div>
        <input
          type="text"
          value={address}
          placeholder="기본 주소"
          className="border p-2 rounded w-full"
          readOnly
        />
        {/* 예식장명 */}
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-700">예식장명</label>
          <input
            type="text"
            placeholder="예식장 이름 입력"
            className="border p-2 rounded w-3/4"
            minLength={2}
            maxLength={36}
          />
        </div>
        {/* 층과 홀 */}
        <div className="flex items-center">
          <label className="w-1/4 font-semibold text-gray-700">층과 홀</label>
          <input
            type="text"
            placeholder="층과 웨딩홀 이름 입력"
            className="border p-2 rounded w-3/4"
            minLength={2}
            maxLength={36}
          />
        </div>
      </div>
      {/* DaumPost 팝업 */}
      {popup && <DaumPost handleComplete={handleComplete} />}
    </div>
  );
};

export default AddressInput;
