import PhotoTalkList from '@/pages/PhotoTalk/PhotoTalkList';

const AdminPhotoTalkPage = () => {
  return (
    <div className="result-layout w-full">
      <div className="column-center w-full flex flex-col gap-4">
        <div className="title">포토톡 모아보기</div>
        <p className="mb-4 text-center text-sm font-light leading-loose">
          포토톡 설명?
        </p>
        <PhotoTalkList isAdmin={true} />
      </div>
    </div>
  );
};

export default AdminPhotoTalkPage;
