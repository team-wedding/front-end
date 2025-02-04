import PhotoTalkList from '@/components/common/PhotoTalk/PhotoTalkList';

const AdminPhotoTalkPage = () => {
  return (
    <div className="result-layout w-full">
      <div className="column-center w-full flex flex-col gap-4">
        <div className="title">포토톡 모아보기</div>

        <PhotoTalkList isAdmin={true} />
      </div>
    </div>
  );
};

export default AdminPhotoTalkPage;
