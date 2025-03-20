import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import PhotoTalkList from '@/components/common/PhotoTalk/PhotoTalkList';
import BackIcon from '@/components/icons/BackIcon';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PhotoTalkPage = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);
  console.log(isEditorOpen);
  const navigate = useNavigate();

  const { userId, invitationId } = useParams();

  return (
    <div className="bg-white max-w-[520px]  min-h-screen m-auto">
      <header className="fixed top-0 left-0 right-0 z-20 m-auto max-w-[520px] bg-white/60 flex-center h-12 backdrop-blur-3xl">
        <button
          onClick={() => navigate(`/result/${userId}/${invitationId}`)}
          className="absolute left-0 p-3"
        >
          <BackIcon />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-md">
          포토톡
        </div>
      </header>

      <div className="h-12"></div>

      <aside className="py-8 w-full">
        <p className="text-center text-xs font-light leading-loose tracking-wide text-black/80">
          사진과 함께 축하 메시지를 남길 수 있는 공간이에요!
          <br />
          다른 사람들의 포토톡도 함께 보며 추억을 나눠보면 어떨까요?
        </p>
      </aside>

      <main>
        <section className="px-3 bg-gradient-to-br from-[#DEE8FF] via-[#EFE1F4] to-[#FFDBE9] rounded-t-[40px] border-t min-h-screen">
          <PhotoTalkList
            isAdmin={false}
            onOpenEditor={() => setEditorOpen(true)}
          />
        </section>

        <PhotoTalkEditor
          isOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
        />
      </main>
    </div>
  );
};

export default PhotoTalkPage;
