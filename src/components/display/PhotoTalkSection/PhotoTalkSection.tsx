import { Link } from 'react-router';

const PhotoTalkSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="sub-title">PHOTO TALK</div>
        <div className="title">포토톡</div>
        <p className="mb-2 text-center text-sm font-light">방명록 작성 문구</p>
        <Link
          to="/phototalk"
          className="py-2 bg-button text-white hover:bg-button/80 rounded-full px-8"
        >
          작성하러 가기
        </Link>
      </div>
    </div>
  );
};

export default PhotoTalkSection;
