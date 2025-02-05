import SectionTitle from '@/components/common/SectionTitle';
import { Link, useParams } from 'react-router';

const PhotoTalkSection = () => {
  const { userId, invitationId } = useParams();
  console.log('userId : ', userId);
  console.log('invitationId : ', invitationId);

  return (
    <div className="bg-rose-50/70 py-16 my-10 w-full">
      <div className="column-center gap-4">
        <SectionTitle subTitle="PHOTO TALK" title="포토톡" />

        <p className="text-center leading-loose my-5">
          소중한 마음을 남겨주시면
          <br />큰 기쁨이 될 것 같습니다
          <br />
          방명록에 따뜻한 한마디 남겨주세요
        </p>
        <Link
          to={`/phototalk/${userId}/${invitationId}`}
          className="py-2 bg-button text-white hover:bg-button/80 rounded-full px-8"
        >
          작성하러 가기
        </Link>
      </div>
    </div>
  );
};

export default PhotoTalkSection;
