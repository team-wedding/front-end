import { useEffect } from 'react';
import ResultDisplay from '../components/display/ResultDisplay';
import { updateInvitationStore } from '@/actions/invitationAction';
import { useGetInvitation } from '@/hooks/useInvitation';
import { useParams } from 'react-router';
import logo from '@/assets/woogyeol/logo_light.png';
import InvitationLoader from '@/components/common/InvitationLoader/InvitaionLoader';

const ResultPage = () => {
  const { invitationId } = useParams();
  const { invitations, isFetching, isLoading } = useGetInvitation(
    parseInt(invitationId!),
  );

  useEffect(() => {
    if (invitations) {
      updateInvitationStore(invitations);
    }
  }, [invitations]);

  return (
    <div className="bg-[#F2F2F7] w-full min-h-screen column-center relative">
      {isFetching || isLoading ? <InvitationLoader /> : <ResultDisplay />}
      <footer className="absolute bottom-10 flex-center gap-1">
        <img src={logo} alt="WooGyeol" className="w-4" />
        <span className="text-xs text-black/60">우리 결혼해요</span>
      </footer>
    </div>
  );
};
export default ResultPage;
