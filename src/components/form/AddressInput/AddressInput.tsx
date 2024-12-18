import React, { useState } from 'react';
import DaumPost from './DaumPost';

interface PostCode {
  address: string;
  zonecode: string | number; // zonecode는 문자열 초기값을 위해 설정
}

const AddressInput: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false);

  // 상태값 설정
  const [form, setForm] = useState<PostCode>({
    address: '',
    zonecode: '',
  });

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
            value={form.zonecode}
            placeholder="우편번호"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus-visible:ring-0 focus:ring-primary focus:border-primary flex-1"
            readOnly
          />
          <button
            onClick={handleComplete}
            className="bg-primary hover:bg-pink-600 text-white px-4 py-2 rounded-xl shrink-0"
          >
            검색
          </button>
        </div>
        <div className="flex items-center">
          <label className="label">기본 주소</label>
          <input
            type="text"
            value={form.address}
            placeholder="기본 주소"
            className="formInput"
            readOnly
          />
        </div>
        {/* 예식장명 */}
        <div className="flex items-center">
          <label className="label">예식장명</label>
          <input
            type="text"
            placeholder="예식장 이름"
            className="formInput"
            maxLength={36}
          />
        </div>
        {/* 층과 홀 */}
        <div className="flex items-center">
          <label className="label">층과 홀</label>
          <input
            type="text"
            placeholder="층과 웨딩홀 이름"
            className="formInput"
            minLength={2}
            maxLength={36}
          />
        </div>
      </div>
      {/* DaumPost 팝업 */}
      {popup && (
        <DaumPost
          address={form}
          setAddress={setForm}
          handleComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default AddressInput;