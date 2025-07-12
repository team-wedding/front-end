import { useState } from 'react';
import DaumPost from './DaumPost';
import useAddressStore from '@store/useAddressStore';
import { useCompletionTracker } from '@/hooks/useCompletionTracker';

const AddressInput = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const {
    address,
    zonecode,
    weddingHallName,
    weddingHallDetail,
    setWeddingHallName,
    setWeddingHallDetail,
  } = useAddressStore();

  const addressInfo = [address, zonecode, weddingHallName, weddingHallDetail];
  const addressFilled = addressInfo.every((info) => String(info).trim() !== '');
  useCompletionTracker({
    feature: 'weddingPlaceInput',
    isCompleted: addressFilled,
    deps: [address, zonecode, weddingHallName, weddingHallDetail],
  });

  const handleComplete = () => {
    setPopup(!popup);
  };

  return (
    <>
      <div className="py-3 space-y-2">
        <label className="label">주소 *</label>

        <div className="flex space-x-2">
          <input
            type="text"
            value={zonecode}
            placeholder="우편번호"
            className="formInput text-slate-500 bg-slate-700/5 rounded-2xl"
            readOnly
          />
          <button
            onClick={handleComplete}
            className="px-6 py-3 text-sm shrink-0 font-medium 
            text-slate-700 glass-button"
          >
            검색
          </button>
        </div>
        <input
          type="text"
          value={address}
          placeholder="기본주소"
          readOnly
          className="formInput py-3 text-slate-500  bg-slate-700/5 rounded-2xl"
        />
      </div>

      <div className="py-3">
        <label htmlFor="weddingHallName" className="label">
          예식장명 *
        </label>
        <input
          type="text"
          value={weddingHallName}
          placeholder="예식장 이름을 입력해주세요"
          className="formInput"
          maxLength={36}
          onChange={(e) => setWeddingHallName(e.target.value)}
        />
      </div>

      <div className="py-3">
        <label htmlFor="weddingHallDetail" className="label">
          층과 홀
        </label>
        <input
          type="text"
          value={weddingHallDetail}
          placeholder="층과 웨딩홀 이름을 입력해주세요"
          className="formInput"
          minLength={2}
          maxLength={36}
          onChange={(e) => setWeddingHallDetail(e.target.value)}
        />
      </div>

      {popup && <DaumPost handleComplete={handleComplete} />}
    </>
  );
};

export default AddressInput;
