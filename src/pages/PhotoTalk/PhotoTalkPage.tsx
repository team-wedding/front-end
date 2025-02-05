// import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
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
      leftButton={
        <button onClick={() => navigate(`/result/${userId}/${invitationId}`)}>
          <BackIcon />
        </button>
      }
      rightButton={null}
      title="포토톡"
      customFooter={false}
    >
      <div className="column-center">
        {/* <div className="sub-title">PHOTO TALK</div>
          <div className="title">포토톡</div> */}
        <div className="w-full py-8 bg-slate-100 mb-8">
          <p className="text-center text-sm font-light leading-loose">
            사진과 함께 축하 메시지를 남길 수 있는 공간이에요!
            <br />
            다른 사람들의 포토톡도 함께 보며 추억을 나눠보면 어떨까요?
          </p>
          {/* <button className="text-xs">작성 방법 보기</button> */}
        </div>

        {/* <button
          onClick={() => setEditorOpen(true)}
          className="my-8 px-6 py-2 bg-button/30 rounded-xl text-sm font-medium hover:bg-button/20"
        >
          작성하기
        </button> */}

        <PhotoTalkList
          isAdmin={false}
          onOpenEditor={() => setEditorOpen(true)}
        />

        {/* <PhotoTalkEditor
          isOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
        /> */}
      </div>
    </PageLayout>
  );
};

export default PhotoTalkPage;
