import { useState } from 'react';
import GreetingModal from './GreetingModal';
import useGreetingStore from '../../../../store/useGreetingStore';
import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import { useCompletionTracker } from '@/hooks/useCompletionTracker';

const GreetingFeature = () => {
  const {
    greetingTitle,
    greetingContent,
    setGreetingTitle,
    setGreetingContent,
  } = useGreetingStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const isFilled = greetingTitle.length > 0 && greetingContent.length > 0;

  useCompletionTracker({
    feature: 'greeting',
    isCompleted: isFilled,
    deps: [greetingTitle, greetingContent],
  });

  return (
    <>
      <InformationItem messages={['샘플 문구를 참고해보세요.']} />

      <div className="py-3">
        <button
          data-modal-target="select-modal"
          data-modal-toggle="select-modal"
          className="py-3 text-xs text-primary underline underline-offset-2 text-left"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          샘플 문구 보기
        </button>
        
        <div className="py-3">
          <label className="label">제목</label>
          <input
            type="text"
            id="greetingTitle"
            placeholder="제목을 입력해주세요"
            value={greetingTitle}
            onChange={(e) => setGreetingTitle(e.target.value)}
            className="formInput"
          />
        </div>

        <div className="py-3">
          <label className="label">인사말</label>
          <textarea
            id="greetingContent"
            placeholder="인사말을 입력해주세요"
            value={greetingContent}
            onChange={(e) => setGreetingContent(e.target.value)}
            rows={8}
            className="formInput"
          />
        </div>
      </div>

      <GreetingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default GreetingFeature;
