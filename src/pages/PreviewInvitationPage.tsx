import BackIcon from '@icons/BackIcon';
import { useNavigate, useParams } from 'react-router';
import PreviewDisplay from '@/components/display/PreviewDisplay';
import { useGetInvitation } from '@/hooks/useInvitation';
import { useAccordionStore } from '@/store/useAccordionStore';
import { useEffect } from 'react';
import { useUpdateInvitationStore } from '@/actions/invitationAction';
import { InvitationDetiail } from '@/types/invitationType';
import logo from '@/assets/woogyeol/logo_light.png';
import CloseIcon from '@/components/icons/CloseIcon';

const PreviewInvitationPage = () => {
  const navigate = useNavigate();

  const { invitationId } = useParams();
  const { invitations } = useGetInvitation(parseInt(invitationId!));
  const { setOrderItems } = useAccordionStore();

  useEffect(() => {
    setOrderItems();
  }, []);

  useUpdateInvitationStore(invitations as InvitationDetiail);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/edit/${invitationId}`);
  };

  return (
    <div className="bg-[#F2F2F7] max-w-[520px]  min-h-screen m-auto">
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
              className="px-3 py-1 mr-3 rounded-full text-sm bg-gradient-to-r from-[#CEDFFF] to-[#F8D4E2] text-black font-light border border-white"
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
            className="bg-black/40 rounded-full p-1 hover:bg-black/20"
            onClick={handleBack}
          >
            <CloseIcon className="size-5 text-white" />
          </button>
        </div>
      )}

      <p className="text-center text-sm font-light text-black/70 p-6 animate-pulse">
        미리보기 화면입니다.
      </p>

      <main className="pb-40 relative">
        <PreviewDisplay />
        <footer className="absolute bottom-10 right-0 left-0 flex-center gap-1">
          <img src={logo} alt="WooGyeol" className="w-4" />
          <span className="text-xs text-black/60">우리, 결혼해요</span>
        </footer>
      </main>
    </div>
  );
};

export default PreviewInvitationPage;
