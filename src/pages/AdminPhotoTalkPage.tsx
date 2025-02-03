import PhotoTalkList from '@components/display/PhotoTalkSection/PhotoTalkList';

const AdminPhotoTalkPage = () => {
  return (
    <div className="result-layout w-full">
      <div className="column-center w-full">
        <div className="title">포토톡 모아보기</div>
      </div>
      <PhotoTalkList isAdmin={true} />
    </div>
  );
};

export default AdminPhotoTalkPage;
