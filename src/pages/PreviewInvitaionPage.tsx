import BackIcon from '@icons/BackIcon';
// import ShareIcon from '@icons/ShareIcon';
// import TrashIcon from '@icons/TrashIcon';
// import EditIcon from '@icons/EditIcon';
// import PageLayout from '@layout/PageLayout';
// import HeaderButton from '@common/Header/HeaderButton';
import { useNavigate, useParams } from 'react-router';
import PreviewDisplay from '@/components/display/PreviewDisplay';
// import { useUserStore } from '@/store/useUserStore';
import { useGetInvitation } from '@/hooks/useInvitation';
import { useAccordionStore } from '@/store/useAccordionStore';
import { useEffect } from 'react';
import { useUpdateInvitationStore } from '@/actions/invitationAction';
import { InvitationDetiail } from '@/types/invitationType';
import logo from '@/assets/woogyeol/logo_light.png';

const PreviewInvitaionPage = () => {
  // const { id } = useUserStore();
  const navigate = useNavigate();

  const { invitationId } = useParams();
  const { invitations } = useGetInvitation(parseInt(invitationId!));
  const { setOrderItems } = useAccordionStore();

  useEffect(() => {
    setOrderItems();
  }, []);
  useUpdateInvitationStore(invitations as InvitationDetiail);

  const handleBack = () => {
    return invitationId ? navigate('/dashboard') : navigate('/create');
  };

  const handleEdit = () => {
    navigate(`/edit/${invitationId}`);
  };

  return (
    // <PageLayout
    //   leftButton={
    //     <HeaderButton onClick={handleBack}>
    //       <BackIcon />
    //     </HeaderButton>
    //   }
    //   title="미리보기"
    //   customFooter={null}
    // >
    <div className="bg-[#F2F2F7] max-w-[520px]  min-h-screen m-auto">
      <header className="flex-between h-12 bg-black/90">
        <button onClick={handleBack} className="p-3 text-white">
          <BackIcon />
        </button>
        {invitationId && (
          <button
            onClick={handleEdit}
            className="px-3 py-1 mr-3 rounded-full text-sm bg-gradient-to-r from-[#CEDFFF] to-[#F8D4E2] text-black font-light border border-white"
          >
            수정하기
          </button>
        )}
      </header>

      <div className="text-center text-xs text-black/70 p-6 animate-pulse">
        미리보기 화면입니다.
      </div>

      <main className="pb-40 relative">
        <PreviewDisplay />
        <footer className="absolute bottom-10 right-0 left-0 flex-center gap-1">
          <img src={logo} alt="WooGyeol" className="w-4" />
          <span className="text-xs text-black/60">우리 결혼해요</span>
        </footer>
      </main>
    </div>
    // </PageLayout>
  );
};

export default PreviewInvitaionPage;
