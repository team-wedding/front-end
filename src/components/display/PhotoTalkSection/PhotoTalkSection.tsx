import { Link } from 'react-router';

const PhotoTalkSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <div className="sub-title">PHOTO TALK</div>
        <div className="title">포토톡</div>
        <p className="mb-4 text-center text-sm font-light leading-loose">
          소중한 마음을 남겨주시면
          <br />큰 기쁨이 될 것 같습니다.
          <br />
          방명록에 따뜻한 한마디 남겨주세요.
        </p>
        <Link
          to="/phototalk"
          className="py-2 m-2 bg-button text-white hover:bg-button/80 rounded-full px-8"
        >
          작성하러 가기
        </Link>
      </div>
    </div>
  );
};

export default PhotoTalkSection;
