import Card from '@common/Card/Card';
import { InvitationDetiail } from '../types/invitationType';
import { useEffect, useState } from 'react';
import { useGetInvitations } from '@/hooks/useInvitation';
import logo from '@/assets/woogyeol/logo_light.png';
import DarkModeToggle from '@/components/common/DarkMode/DarkModeToggle';
import Navbar from '@/components/common/Navbar/Navbar';

const DashBoardPage = () => {
  const { data, isPending, isRefetching, status, isError, isFetching } =
    useGetInvitations();
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
    <div className="bg-white max-w-[520px]  min-h-screen m-auto">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-20 m-auto max-w-[520px] bg-white flex justify-start items-center max-h-12">
        <div className="p-3">
          <img alt="WooGyeol" src={logo} className="w-6" />
        </div>
        <div className="absolute top-0 right-0">
          <DarkModeToggle />
        </div>
      </header>

      {/* 메인 */}
      <main className="min-h-screen flex flex-col">
        <div className="h-12"></div>

        <div className="min-h-screen px-3 pb-40 flex-1">
          <div className="h-full flex-between">
            <div className="text-sm font-extralight py-3 text-neutral-900">
              나의 청첩장 목록
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 place-items-center">
            {isPending || isRefetching ? (
              <>Loading....</>
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

          {invitations.length === 0 && (
            <div className="column-center gap-4 w-3/4 m-auto h-60 rounded-2xl bg-black/20 text-white">
              <span className="text-md">아직 저장된 청첩장이 없어요.</span>
              <button className="w-28 py-2 text-sm bg-white/20 rounded-2xl trasition-all duration-200 hover:bg-black/10">
                청첩장 만들기
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 메뉴 */}
      <Navbar />
    </div>
  );
};

export default DashBoardPage;
