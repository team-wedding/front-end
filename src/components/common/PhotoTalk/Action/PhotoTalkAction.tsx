import { USER_MODE, UserMode } from '@/types/users';

interface PhotoTalkActionsProps {
  userMode: UserMode;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PhotoTalkAction = ({
  userMode,
  onEdit,
  onDelete,
}: PhotoTalkActionsProps) => {
  return (
    <ul className="py-2">
      {(userMode === USER_MODE.GUEST || userMode === USER_MODE.PREVIEW) && (
        <li>
          <button
            onClick={onEdit}
            aria-label="편집하기"
            className="block w-full text-left text-sm text-gray-700 p-2 pl-3 hover:bg-black/5 rounded-2xl"
          >
            편집하기
          </button>
        </li>
      )}

      <li>
        <button
          onClick={onDelete}
          aria-label="삭제하기"
          className="block w-full text-left text-sm text-red-500 p-2 pl-3 hover:bg-black/5 rounded-2xl"
        >
          삭제하기
        </button>
      </li>
    </ul>
  );
};

export default PhotoTalkAction;
