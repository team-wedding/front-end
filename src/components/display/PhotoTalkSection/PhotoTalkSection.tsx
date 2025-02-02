import { Link } from 'react-router';

const PhotoTalkSection = () => {
  return (
    <div className="w-full">
      <div className="column-center">
        <div className="sub-title">PHOTO TALK</div>
        <div className="title">포토톡</div>
        <Link to="/phototalk" className="select-btn">
          작성하러 가기
        </Link>
      </div>
    </div>
  );
};

export default PhotoTalkSection;
