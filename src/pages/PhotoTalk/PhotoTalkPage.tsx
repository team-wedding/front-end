import usePhotoTalkStore from '@store/usePhotoTalkStore';
import PhotoTalkList from '@/pages/PhotoTalk/PhotoTalkList';

const PhotoTalkPage = () => {
  const { openEditor } = usePhotoTalkStore();

  return (
    <div className="result-layout w-full">
      <div className="column-center w-full">
        <div className="sub-title">PHOTO TALK</div>
        <div className="title">포토톡</div>
        <p className="mb-4 text-center text-sm font-light leading-loose">
          포토톡 설명?
        </p>
        <button onClick={openEditor} className="select-btn">
          작성하기
        </button>
      </div>
      <PhotoTalkList isAdmin={false} />
    </div>
  );
};

export default PhotoTalkPage;
