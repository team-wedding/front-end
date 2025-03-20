import { useEffect } from 'react';
import ResultDisplay from '../components/display/ResultDisplay';
import { useUpdateInvitationStore } from '@/actions/invitationAction';
import { InvitationDetiail } from '@/types/invitationType';
import { useGetInvitation } from '@/hooks/useInvitation';
import { useAccordionStore } from '@/store/useAccordionStore';
import { useParams } from 'react-router';
import logo from '@/assets/woogyeol/logo_light.png';

const ResultPage = () => {
  const { invitationId } = useParams();
  // console.log(invitationId);
  const { invitations } = useGetInvitation(parseInt(invitationId!));
  const { setOrderItems } = useAccordionStore();

  useEffect(() => {
    setOrderItems();
  }, []);
  useUpdateInvitationStore(invitations as InvitationDetiail);

  return (
    <div className="bg-[#F2F2F7] w-full min-h-screen column-center relative">
      <ResultDisplay />
      <footer className="absolute bottom-10 flex-center gap-1">
        <img src={logo} alt="WooGyeol" className="w-4" />
        <span className="text-xs text-black/60">우리 결혼해요</span>
      </footer>
    </div>
  );
};
export default ResultPage;
