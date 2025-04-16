import SectionTitle from '@/components/common/SectionTitle';
import { useLocation, useNavigate, useParams } from 'react-router';

const PhotoTalkSection = () => {
  const navigate = useNavigate();
  const { userId, invitationId } = useParams();
  const location = useLocation();

  const isPreview = location.pathname.includes('/preview');

  const handleClick = () => {
    return isPreview
      ? navigate(`/preview/phototalk`)
      : navigate(`/phototalk/${userId}/${invitationId}`);
  };

  return (
    <div className="column-center gap-4 py-20">
      <SectionTitle subTitle="PHOTO TALK" title="포토톡" />
      <div className="column-center bg-slate-100 px-20 py-12 rounded-xl">
        <p className="text-center leading-loose mb-8">
          소중한 마음을 남겨주시면
          <br />큰 기쁨이 될 것 같습니다
          <br />
          방명록에 따뜻한 한마디 남겨주세요
        </p>
        <button
          onClick={handleClick}
          aria-label="포토톡 작성하기"
          className="py-2 bg-slate-700 text-white hover:bg-button/80 rounded-full px-8"
        >
          작성하러 가기
        </button>
      </div>
    </div>
  );
};

export default PhotoTalkSection;
