import React, { useState } from 'react';
import useGreetingStore from './useGreetingStore';
import GreetingModal from './GreetingModal';

const GreetingInput = () => {
  const { title, greeting, setTitle } = useGreetingStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleSubmit = () => {
    alert('저장 완료');
  };

  return (
    <div>
      <div>
        <label>
          제목:
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%' }}
          />
        </label>
      </div>
      <div>
        <label>
          인사말:
          <textarea
            placeholder="내용을 입력해주세요"
            value={greeting}
            onChange={(e) =>
              useGreetingStore.getState().setGreeting(e.target.value)
            }
            style={{ width: '100%' }}
          />
        </label>
      </div>
      <button onClick={() => setModalOpen(true)}>샘플 문구 보기</button>
      <GreetingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <button onClick={handleSubmit}>저장하기</button>
    </div>
  );
};

export default GreetingInput;
