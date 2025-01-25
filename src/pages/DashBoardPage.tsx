import Card from '../components/common/Card/Card';
import PageLayout from '../components/layout/PageLayout';
import CreateCard from '../components/common/Card/CreateCard';
import { useQuery } from '@tanstack/react-query';
import { getInvitations } from '../services/invitation';
import { InvitationDetiail } from '../types/invitationType';
import { useEffect, useState } from 'react';

const DashBoardPage = () => {

  const { data, isPending, isRefetching, status } = useQuery({
    queryKey: ['invitations'],
    queryFn: getInvitations,
  })



  useEffect(() => {
    // console.log("rendering")
  }, [data, status])


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
            <Card key={card.id} image={card.imgUrl} id={card.id as number} title={card.content} />)) : <>no data</>
        }
      </div>
    </PageLayout>
  );
};

export default DashBoardPage;
