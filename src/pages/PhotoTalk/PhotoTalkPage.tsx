import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import PhotoTalkList from '@/components/common/PhotoTalk/PhotoTalkList';
import { useState } from 'react';

const PhotoTalkPage = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);

  return (
    <div className="result-layout w-full">
      <div className="column-center w-full">
        <div className="sub-title">PHOTO TALK</div>
        <div className="title">포토톡</div>
        <p className="mb-4 text-center text-sm font-light leading-loose">
          포토톡 설명?
        </p>
        <button onClick={() => setEditorOpen(true)} className="select-btn">
          작성하기
        </button>
      </div>

      <PhotoTalkList isAdmin={false} onOpenEditor={() => setEditorOpen(true)} />

      <PhotoTalkEditor
        isOpen={isEditorOpen}
        closeEditor={() => setEditorOpen(false)}
      />
    </div>
  );
};

export default PhotoTalkPage;
