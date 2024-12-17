import React, { useState } from 'react';
import useGreetingStore from './useGreetingStore';
import GreetingModal from './GreetingModal';

const GreetingInput = () => {
  const { title, greeting, setTitle } = useGreetingStore();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
        />
      </div>
      <div>
        <textarea
          placeholder="내용을 입력해주세요"
          value={greeting}
          onChange={(e) =>
            useGreetingStore.getState().setGreeting(e.target.value)
          }
          rows={4}
          className="mb-4 block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
        />
      </div>
      <button
        data-modal-target="select-modal"
        data-modal-toggle="select-modal"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        onClick={() => setModalOpen(true)}
      >
        샘플 문구 보기
      </button>
      <GreetingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default GreetingInput;
