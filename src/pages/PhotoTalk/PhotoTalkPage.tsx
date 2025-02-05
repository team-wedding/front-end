import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import PhotoTalkList from '@/components/common/PhotoTalk/PhotoTalkList';
import BackIcon from '@/components/icons/BackIcon';
import PageLayout from '@/components/layout/PageLayout';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PhotoTalkPage = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);
  const navigate = useNavigate();

  const { userId, invitationId } = useParams();

  return (
    <PageLayout
      leftButton={<button onClick={() => navigate(`/result/${userId}/${invitationId}`)}>
        <BackIcon />
      </button>}
      rightButton={null}
      title="포토톡"
      customFooter={false}
    >
      <div>
        <div className="column-center w-full py-10">
          {/* <div className="sub-title">PHOTO TALK</div>
          <div className="title">포토톡</div> */}
          <p className="mb-6 text-center text-sm font-light leading-loose">
            사진과 함께 축하 메시지를 남길 수 있는 공간이에요!<br />
            다른 사람들의 포토톡도 함께 보며 추억을 나눠보면 어떨까요?
          </p>
          <button
            onClick={() => setEditorOpen(true)}
            className="px-6 py-2 border bg-red-50 rounded-xl text-sm font-semibold"
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
