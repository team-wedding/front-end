import Card from '@common/Card/Card';
import PageLayout from '@layout/PageLayout';
import CreateCard from '@common/Card/CreateCard';
import { InvitationDetiail } from '../types/invitationType';
import { useEffect, useState } from 'react';
import { useGetInvitations } from '@/hooks/useInvitation';

const DashBoardPage = () => {
  const { data, isPending, isRefetching, status, isError, isFetching } = useGetInvitations()
  const [invitations, setInvitations] = useState([]);
  useEffect(() => {
    if (data) {
      setInvitations(data);
    }
  }, [data, status, isFetching]);

  if (isError) {
    return <>something went wrong</>;
  }
  return (
    <PageLayout title="우리, 결혼해요">
      {/* <div className="flex-center px-4 py-3 bg-neutral-50 text-background text-[10px] mb-5 tracking-wider">
        우리만의 청첩장을 꾸미고 관리해보세요
      </div> */}
      <div className="grid grid-cols-2 gap-6 place-items-center  mx-6 my-10">
        <div>
          <CreateCard />
        </div>
        {isPending || isRefetching ? (
          <>Loading....</>
        ) : invitations.length === 0 ? (
          <>no data</>
        ) : (
          invitations.map((card: InvitationDetiail) => (
            <Card
              key={card.id}
              image={card.imgUrl}
              id={card.id as number}
              title={card.title}
            />
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default DashBoardPage;
