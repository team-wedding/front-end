import Card from '@common/Card/Card';
import PageLayout from '@layout/PageLayout';
import CreateCard from '@common/Card/CreateCard';
import { useQuery } from '@tanstack/react-query';
import { getInvitations } from '../services/invitation';
import { InvitationDetiail } from '../types/invitationType';
import { useEffect, useState } from 'react';
import exampleImage from '../assets/image/wedding1.png';

const DashBoardPage = () => {
  const { data, isPending, isRefetching, status, isError } = useQuery({
    queryKey: ['invitations'],
    queryFn: getInvitations,
  });

  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    if (data) {
      setInvitations(data);
    }
  }, [data, status]);

  // if (isError) {
  //   return <>something went wrong</>;
  // }
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
              title={card.content}
            />
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default DashBoardPage;
