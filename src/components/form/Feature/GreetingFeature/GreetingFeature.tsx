import { useState } from 'react';
import GreetingModal from './GreetingModal';
import useGreetingStore from '../../../../store/useGreetingStore';

const GreetingFeature = () => {
  const { greetingTitle, greetingContent, setGreetingTitle, setGreetingContent } = useGreetingStore();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex flex-col gap-3">
        <button
          data-modal-target="select-modal"
          data-modal-toggle="select-modal"
          className="text-xs text-primary hover:text-pink-600 underline underline-offset-2 text-left"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          샘플 문구 보기
        </button>

        <input
          type="text"
          placeholder="제목"
          value={greetingTitle}
          onChange={(e) => setGreetingTitle(e.target.value)}
          className="formInput"
        />

        <textarea
          placeholder="인사말"
          value={greetingContent}
          onChange={(e) =>
            setGreetingContent(e.target.value)
          }
          rows={8}
          className="formInput"
        />

        <GreetingModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default GreetingFeature;
