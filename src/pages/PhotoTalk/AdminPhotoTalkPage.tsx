import PhotoTalkList from '@/components/common/PhotoTalk/PhotoTalkList';

const AdminPhotoTalkPage = () => {
  return (
    <main className="min-h-screen">
      <PhotoTalkList isAdmin={true} />
    </main>
  );
};

export default AdminPhotoTalkPage;
