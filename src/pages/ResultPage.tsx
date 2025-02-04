import { useEffect } from 'react';
import ResultDisplay from '../components/display/ResultDisplay';
import { useUpdateInvitationStore } from '@/actions/invitationAction';
import { InvitationDetiail } from '@/types/invitationType';
import { useGetInvitation } from '@/hooks/useInvitation';
import { useAccordionStore } from '@/store/useAccordionStore';
import { useParams } from 'react-router';

const ResultPage = () => {
  const { invitationId } = useParams();
  console.log(invitationId);
  const { invitations } = useGetInvitation(parseInt(invitationId!));
  const { setOrderItems } = useAccordionStore();

  useEffect(() => {
    setOrderItems()
  }, [])
  useUpdateInvitationStore(invitations as InvitationDetiail);

  return (
    <div className="bg-slate-300 w-full min-h-screen flex-center">
      <ResultDisplay />
    </div>
  );
};
export default ResultPage;

