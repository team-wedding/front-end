import usePhotoTalkStore from '@store/usePhotoTalkStore';
import PhotoTalkList from '@components/display/PhotoTalkSection/PhotoTalkList';

const PhotoTalkPage = () => {
  const { openEditor } = usePhotoTalkStore();

  return (
    <div className="result-layout w-full">
      <div className="column-center w-full">
        <div className="sub-title">PHOTO TALK</div>
        <div className="title">포토톡</div>
        <button onClick={openEditor} className="select-btn">
          작성하기
        </button>
      </div>
      <PhotoTalkList isAdmin={false} />
    </div>
  );
};

export default PhotoTalkPage;
