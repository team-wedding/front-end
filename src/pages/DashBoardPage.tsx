import Card from '../components/common/Card/Card';
import PageLayout from '../components/layout/PageLayout';
import CreateCard from '../components/common/Card/CreateCard';

import { useNavigate } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import { getInvitations } from '../services/invitation';
import { InvitationDetiail } from '../types/invitationType';
import { useEffect } from 'react';

const DashBoardPage = () => {
  const navigate = useNavigate();

  const handleCreateCard = () => {
    navigate(`/create `);
  };

  const { isSuccess, data, refetch, isPending, isRefetching } = useQuery({
    queryKey: ['invitations'],
    queryFn: getInvitations,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    refetch()
  }, [data, isSuccess])

  console.log("remd")
  return (
    <PageLayout title="우리, 결혼해요">
      <div className="flex-center px-4 pb-3 border-b border-background opacity-40 text-background text-[10px] m-5 tracking-wider">
        우리만의 청첩장을 꾸미고 관리해보세요
      </div>
      <div className="grid grid-cols-2 gap-6 place-items-center  px-6 pb-10">
        <div>
          <CreateCard />
        </div>
        {
          isPending || isRefetching ? <>Loading....</> : data ? data.map((card: InvitationDetiail) => (
            <Card key={card.id} image={card.imgUrl} id={card.id as number} />)) : <>no data</>
        }
      </div>
    </PageLayout>
  );
};

export default DashBoardPage;
