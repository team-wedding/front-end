import SectionTitle from '@/components/common/SectionTitle';
import { useUserStore } from '@/store/useUserStore';
import { Link, useParams } from 'react-router';

const PhotoTalkSection = () => {
  const { id } = useUserStore();
  const { invitationId } = useParams();

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
        <Link
          to={`/phototalk/${id}/${invitationId}`}
          className="py-2 bg-slate-700 text-white hover:bg-button/80 rounded-full px-8"
        >
          작성하러 가기
        </Link>
      </div>
    </div>
  );
};

export default PhotoTalkSection;
