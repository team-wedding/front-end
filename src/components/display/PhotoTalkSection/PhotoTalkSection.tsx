import { Link } from 'react-router';

const PhotoTalkSection = () => {
  return (
    <div className="w-96">
      <div className="column-center w-full">
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
