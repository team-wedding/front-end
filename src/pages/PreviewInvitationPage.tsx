import BackIcon from '@icons/BackIcon';
import { useNavigate, useParams } from 'react-router';
import PreviewDisplay from '@/components/display/PreviewDisplay';
import { useGetInvitation } from '@/hooks/useInvitation';
import { useEffect } from 'react';
import { updateInvitationStore } from '@/actions/invitationAction';
import CloseIcon from '@/components/icons/CloseIcon';
import Logo from '@/components/common/Logo';
import InvitationLoader from '@/components/common/InvitationLoader/InvitaionLoader';

const PreviewInvitationPage = () => {
  const navigate = useNavigate();

  const { invitationId } = useParams();
  const { invitations, isLoading, isFetching } = useGetInvitation(
    parseInt(invitationId!),
  );

  useEffect(() => {
    if (invitations) {
      updateInvitationStore(invitations);
    }
  }, [invitations]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/edit/${invitationId}`);
  };

  return (
    <div className="bg-surface-muted dark:bg-surface-muted-dark max-w-[520px] min-h-screen m-auto">
      {invitationId ? (
        <>
          <header className="fixed top-0 left-0 right-0 z-50 m-auto max-w-[520px] flex-between h-12 bg-black/90 backdrop-blur-3xl">
            <button
              onClick={handleBack}
              aria-label="뒤로가기"
              className="p-3 text-white"
            >
              <BackIcon />
            </button>

            <button
              onClick={handleEdit}
              aria-label="수정하기"
              className="px-3 py-1 mr-3 rounded-full text-sm bg-gradient-to-r from-primary-muted to-secondary-muted text-black font-light border border-white"
            >
              수정하기
            </button>
          </header>
          <div className="h-12"></div>
        </>
      ) : (
        <div className="fixed top-3 left-3 right-0 z-50 m-auto max-w-[520px]">
          <button
            aria-label="미리보기 닫기"
            className="bg-black/20 dark:bg-white/20 rounded-full p-2 hover:bg-surface-muted/20 dark:hover:surface-muted/20"
            onClick={handleBack}
          >
            <CloseIcon
              className="size-5 text-white dark:text-black"
              strokeWidth="2"
            />
          </button>
        </div>
      )}

      <p className="text-center text-sm font-light text-label-secondary/60 dark:text-label-secondary-dark/60 p-6 animate-pulse">
        미리보기 화면입니다.
      </p>

      <main className="pb-40 relative">
        {isLoading || isFetching ? <InvitationLoader /> : <PreviewDisplay />}
        <footer className="absolute bottom-10 right-0 left-0 flex-center gap-1">
          <Logo className="w-4" />
          <span className="text-xs text-label-secondary/60 dark:text-label-secondary-dark/60">
            우리, 결혼해요
          </span>
        </footer>
      </main>
    </div>
  );
};

export default PreviewInvitationPage;
