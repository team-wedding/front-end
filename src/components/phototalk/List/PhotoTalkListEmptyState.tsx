import EditIcon from '@/components/icons/EditIcon';
import { USER_MODE } from '@/constants/photoTalkUserConstants';
import { UserMode } from '@/types/photoTalkUserTypes';

interface PhotoTalkEmptyStateProps {
  userMode: UserMode;
}

const PhotoTalkListEmptyState = ({ userMode }: PhotoTalkEmptyStateProps) => {
  return (
    <>
      {userMode === USER_MODE.ADMIN && (
        <>
          <div className="h-6"></div>
          <p className="text-center text-sm text-black/40 font-light bg-white/80 rounded-2xl p-16 w-[90%] m-auto">
            아직 업로드된 포토톡이 없습니다.
          </p>
        </>
      )}
      {userMode === USER_MODE.GUEST && (
        <div className="flex-center w-[80%] m-auto gap-2 bg-white/30 p-12 rounded-2xl mt-6">
          <EditIcon className="size-[20px] text-black/30" strokeWidth={1} />
          <p className="text-sm font-light text-black/30 text-center leading-6">
            첫 번째 포토톡을 작성하고
            <br /> 따뜻한 마음을 전해보세요
          </p>
        </div>
      )}
    </>
  );
};

export default PhotoTalkListEmptyState;
