import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import PhotoTalkList from '@/components/common/PhotoTalk/PhotoTalkList';
// import BackIcon from '@/components/icons/BackIcon';
import PhotoTalkLayout from '@/components/layout/PhotoTalkLayout';
import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router';

const PhotoTalkPage = () => {
  // const navigate = useNavigate();
  // const { userId, invitationId } = useParams();
  const [isEditorOpen, setEditorOpen] = useState(false);

  // const handleBack = () => navigate(`/result/${userId}/${invitationId}`);

  return (
    <PhotoTalkLayout title="포토톡">
      <section
        className="px-3 bg-gradient-to-br from-[#DEE8FF] via-[#EFE1F4] to-[#FFDBE9] rounded-t-[40px] border-t min-h-screen pb-28"
        aria-label="포토톡 메시지 리스트"
      >
        <PhotoTalkList
          isAdmin={false}
          onOpenEditor={() => setEditorOpen(true)}
        />
      </section>

      <section aria-label="포토톡 메시지 작성">
        <PhotoTalkEditor
          isOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
        />
      </section>
    </PhotoTalkLayout>
  );
};

export default PhotoTalkPage;
