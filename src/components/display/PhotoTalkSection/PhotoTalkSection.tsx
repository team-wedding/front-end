import { Link, useParams } from 'react-router';

const PhotoTalkSection = () => {
  const { userId, invitationId } = useParams()
  console.log("userId : ", userId)
  console.log("invitaionsId : ", invitationId)
  return (
    <div className="w-96">
      <div className="column-center w-full">
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
      <PhotoTalkEditor />

      <PasswordConfirmModal
        isOpen={!!selectedPhotoTalk}
        onClose={() => setSelectedPhotoTalk(null)}
        onConfirm={confirmPassword}
      />
    </div>
  );
};

export default PhotoTalkSection;
