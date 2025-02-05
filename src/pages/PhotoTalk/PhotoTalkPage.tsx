import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import PhotoTalkList from '@/components/common/PhotoTalk/PhotoTalkList';
import CloseIcon from '@/components/icons/CloseIcon';
import PageLayout from '@/components/layout/PageLayout';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PhotoTalkPage = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);
  const navigate = useNavigate();

  const { userId, invitationId } = useParams();

  return (
    <PageLayout
      leftButton={
        <button onClick={() => navigate(`/result/${userId}/${invitationId}`)}>
          <CloseIcon className="size-5" />
        </button>
      }
      rightButton={null}
      title="포토톡"
      customFooter={false}
    >
      <div>
        <div className="column-center w-full py-10">
          {/* <div className="sub-title">PHOTO TALK</div>
          <div className="title">포토톡</div> */}
          <p className="mb-4 text-center text-sm font-light leading-loose">
            포토톡 설명?
          </p>
          <button
            onClick={() => setEditorOpen(true)}
            className="px-4 py-2 border bg-red-50 rounded-xl text-xs font-semibold"
          >
            작성하기
          </button>
        </div>

        <PhotoTalkList
          isAdmin={false}
          onOpenEditor={() => setEditorOpen(true)}
        />

        <PhotoTalkEditor
          isOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
        />
      </div>
    </PageLayout>
  );
};

export default PhotoTalkPage;
